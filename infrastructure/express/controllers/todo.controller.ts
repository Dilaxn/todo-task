import { Request, Response, NextFunction } from "express";
import * as todoService from "../../../application/services/todo.service";
import * as todoValidation from "../../../presentation/api/validations/todo.validation";
import ValidationError from "../exception/ValidationError";
export const getTodos = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const todos = await todoService.getTodos();
        res.json(todos);
    } catch (error) {
        next(error);
    }
};

export const createTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { title, deadline, status, priority, order } = req.body;

    const { error, value } = todoValidation.createTodoSchema.validate(req.body);

    if (error) {
        throw new ValidationError(error.message);
    }

    const newTodo = await todoService.createTodo({
        title,
        deadline,
        status,
        priority,
        order,
    });
    res.status(201).json(newTodo);
};

export const updateTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const todoId = req.params.id;
    const { title, deadline, status, priority, order } = req.body;

    const { error, value } = todoValidation.updateTodoSchema.validate(req.body);

    if (error) {
        throw new ValidationError(error.message);
    }

    const updatedTodo = await todoService.updateTodo(todoId, {
        title,
        deadline,
        status,
        order,
    });
    res.json(updatedTodo);
};

export const deleteTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const todoId = req.params.id;
    const deletedTodo = await todoService.deleteTodo(todoId);
    res.json(deletedTodo);
};

export const deleteAllTodos = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const result = await todoService.deleteAllTodos();
    res.json(result);
};
