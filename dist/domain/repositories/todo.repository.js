"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllTodos = exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getAllTodos = void 0;
const mongoose_1 = require("mongoose");
//Todo schema
const todoSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    deadline: { type: Date, required: true },
    status: { type: String, default: "active" },
    priority: { type: String, default: "normal" },
    order: { type: Number },
}, { timestamps: true });
//Todo model
const TodoModel = (0, mongoose_1.model)("Todo", todoSchema);
//get all todos
const getAllTodos = async () => {
    return TodoModel.find().exec();
};
exports.getAllTodos = getAllTodos;
//create a new todo
const createTodo = async (todoData) => {
    return TodoModel.create(todoData);
};
exports.createTodo = createTodo;
//update a todo by ID
const updateTodo = async (id, todoData) => {
    return TodoModel.findByIdAndUpdate(id, todoData, { new: true }).exec();
};
exports.updateTodo = updateTodo;
const deleteTodo = async (id) => {
    return TodoModel.findByIdAndDelete(id).exec();
};
exports.deleteTodo = deleteTodo;
const deleteAllTodos = async () => {
    const result = TodoModel.deleteMany({}).exec();
    return result;
};
exports.deleteAllTodos = deleteAllTodos;
