import { Request, Response, NextFunction } from "express";
import errorHandler from "./errorHandler.middleware";

const errorCatch =
    (controller: any) =>
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await controller(req, res, next);
            } catch (error) {
                console.log("cached the error", error);
                errorHandler(error, req, res);
            }
        };

export default errorCatch;
