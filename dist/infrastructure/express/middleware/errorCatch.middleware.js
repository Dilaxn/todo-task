"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_middleware_1 = __importDefault(require("./errorHandler.middleware"));
const errorCatch = (controller) => async (req, res, next) => {
    try {
        await controller(req, res, next);
    }
    catch (error) {
        console.log("cached the error", error);
        (0, errorHandler_middleware_1.default)(error, req, res);
    }
};
exports.default = errorCatch;
