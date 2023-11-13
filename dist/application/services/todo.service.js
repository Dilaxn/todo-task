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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllTodos = exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodos = void 0;
const todoRepository = __importStar(require("../../domain/repositories/todo.repository"));
//get all todos
const getTodos = async () => {
    const todos = await todoRepository.getAllTodos();
    return todos;
};
exports.getTodos = getTodos;
//create a new todo
const createTodo = async (todoData) => {
    const newTodo = await todoRepository.createTodo(todoData);
    return newTodo;
};
exports.createTodo = createTodo;
//update a todo by ID
const updateTodo = async (id, todoData) => {
    const updatedTodo = await todoRepository.updateTodo(id, todoData);
    if (!updatedTodo) {
        throw new Error("Todo not found");
    }
    return updatedTodo;
};
exports.updateTodo = updateTodo;
const deleteTodo = async (id) => {
    const deletedTodo = await todoRepository.deleteTodo(id);
    if (!deletedTodo) {
        throw new Error("Todo not found");
    }
    return deletedTodo;
};
exports.deleteTodo = deleteTodo;
const deleteAllTodos = async () => {
    const result = await todoRepository.deleteAllTodos();
    return result;
};
exports.deleteAllTodos = deleteAllTodos;
