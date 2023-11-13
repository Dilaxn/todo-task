import express from "express";
import * as todoController from "../../../infrastructure/express/controllers/todo.controller";
import errorCatch from "../../../infrastructure/express/middleware/errorCatch.middleware";

const router = express.Router();

router
    .route("/")
    .get(errorCatch(todoController.getTodos))
    .post(errorCatch(todoController.createTodo))
    .delete(errorCatch(todoController.deleteAllTodos));

router
    .route("/:id")
    .put(errorCatch(todoController.updateTodo))
    .delete(errorCatch(todoController.deleteTodo));

export = router;
