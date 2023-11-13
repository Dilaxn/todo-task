"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const todo_router_1 = __importDefault(require("./todo.router"));
const errorHandler_middleware_1 = __importDefault(require("../../../infrastructure/express/middleware/errorHandler.middleware"));
router.use("/todo", todo_router_1.default);
router.use((req, res, next) => {
    const error = new Error("Not Found");
    res.status(404).json({ error: "Route not found" });
    next(error);
});
router.use(errorHandler_middleware_1.default);
module.exports = router;
