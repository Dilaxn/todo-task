"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppLogicError extends Error {
    constructor(errorCode, message, statusCode) {
        super(message);
        this.errorCode = errorCode;
        this.statusCode = statusCode;
    }
}
exports.default = AppLogicError;
