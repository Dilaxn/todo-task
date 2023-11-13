"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppLogicError_1 = __importDefault(require("../exception/AppLogicError"));
const ValidationError_1 = __importDefault(require("../exception/ValidationError"));
const errorHandler = (error, req, res) => {
    if (error instanceof ValidationError_1.default) {
        const valError = error;
        return res.status(valError.statusCode).json({
            error_code: valError.errorCode,
            message: valError?.message,
            success: false,
        });
    }
    if (error instanceof AppLogicError_1.default) {
        const appError = error;
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
exports.default = errorHandler;
