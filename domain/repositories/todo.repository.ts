import { Document, Model, Schema, model } from "mongoose";

//Todo document schema
interface TodoDocument extends Document {
    title: string;
    deadline: Date;
    status: string;
    priority: string;
    order: number;
}

//Todo schema
const todoSchema = new Schema<TodoDocument>(
    {
        title: { type: String, required: true },
        deadline: { type: Date, required: true },
        status: { type: String, default: "active" },
        priority: { type: String, default: "normal" },
        order: { type: Number },
    },
    { timestamps: true }
);

//Todo model
const TodoModel = model<TodoDocument>("Todo", todoSchema);

//get all todos
export const getAllTodos = async (): Promise<TodoDocument[]> => {
    return TodoModel.find().exec();
};

//create a new todo
export const createTodo = async (todoData: {
    title: string;
    deadline: Date;
    status: string;
    priority: string;
    order: number;
}): Promise<TodoDocument> => {
    return TodoModel.create(todoData);
};

//update a todo by ID
export const updateTodo = async (
    id: string,
    todoData: {
        title?: string;
        deadline?: Date;
        status?: string;
        order?: number;
    }
): Promise<TodoDocument | null> => {


    return TodoModel.findByIdAndUpdate(id, todoData, { new: true }).exec();
};

export const deleteTodo = async (id: string): Promise<TodoDocument | null> => {
    return TodoModel.findByIdAndDelete(id).exec();
};

export const deleteAllTodos = async (): Promise<any> => {
    const result = TodoModel.deleteMany({}).exec();
    return result;
};
