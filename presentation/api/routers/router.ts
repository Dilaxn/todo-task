import express from "express";

const router = express.Router();
import todoRouter from "./todo.router";
import errorHandler from "../../../infrastructure/express/middleware/errorHandler.middleware";

router.use("/todo", todoRouter);

router.use((req, res, next) => {
    const error = new Error("Not Found");
    res.status(404).json({ error: "Route not found" });
    next(error);
});

router.use(errorHandler);

export = router;
