"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationError extends Error {
    errorCode;
    statusCode;
    constructor(message) {
        super(message);
        this.errorCode = "ValidationError";
        this.statusCode = 400;
    }
}
exports.default = ValidationError;
