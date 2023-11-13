"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllTodos = exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodos = void 0;
const todoService = __importStar(require("../../../application/services/todo.service"));
const todoValidation = __importStar(require("../../../presentation/api/validations/todo.validation"));
const ValidationError_1 = __importDefault(require("../exception/ValidationError"));
const getTodos = async (req, res, next) => {
    try {
        const todos = await todoService.getTodos();
        res.json(todos);
    }
    catch (error) {
        next(error);
    }
};
exports.getTodos = getTodos;
const createTodo = async (req, res, next) => {
    const { title, deadline, status, priority, order } = req.body;
    const { error, value } = todoValidation.createTodoSchema.validate(req.body);
    if (error) {
        throw new ValidationError_1.default(error.message);
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
exports.createTodo = createTodo;
const updateTodo = async (req, res, next) => {
    const todoId = req.params.id;
    const { title, deadline, status, priority, order } = req.body;
    const { error, value } = todoValidation.updateTodoSchema.validate(req.body);
    if (error) {
        throw new ValidationError_1.default(error.message);
    }
    const updatedTodo = await todoService.updateTodo(todoId, {
        title,
        deadline,
        status,
        order,
    });
    res.json(updatedTodo);
};
exports.updateTodo = updateTodo;
const deleteTodo = async (req, res, next) => {
    const todoId = req.params.id;
    const deletedTodo = await todoService.deleteTodo(todoId);
    res.json(deletedTodo);
};
exports.deleteTodo = deleteTodo;
const deleteAllTodos = async (req, res, next) => {
    const result = await todoService.deleteAllTodos();
    res.json(result);
};
exports.deleteAllTodos = deleteAllTodos;
