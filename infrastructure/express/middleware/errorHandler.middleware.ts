import { Request, Response } from "express";
import AppLogicError from "../exception/AppLogicError";
import ValidationError from "../exception/ValidationError";

const errorHandler = (error: any, req: Request, res: Response) => {
    if (error instanceof ValidationError) {
        const valError = error as ValidationError;
        return res.status(valError.statusCode).json({
            error_code: valError.errorCode,
            message: valError?.message,
            success: false,
        });
    }

    if (error instanceof AppLogicError) {
        const appError = error as AppLogicError;
        return res.status(appError.statusCode).json({
            error_code: appError.errorCode,
            message: appError.message,
            success: false,
        });
    }

    return res.status(500).json({
        error_code: 500,
        message: "Internal server error",
        success: false,
    });
};

export default errorHandler;
