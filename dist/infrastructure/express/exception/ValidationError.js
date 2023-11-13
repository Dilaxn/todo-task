"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.errorCode = "ValidationError";
        this.statusCode = 400;
    }
}
exports.default = ValidationError;
