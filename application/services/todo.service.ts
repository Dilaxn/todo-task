import * as todoRepository from "../../domain/repositories/todo.repository";

//get all todos
export const getTodos = async () => {
    const todos = await todoRepository.getAllTodos();
    return todos;
};

//create a new todo
export const createTodo = async (todoData: {
    title: string;
    deadline: Date;
    status: string;
    priority: string;
    order: number;
}) => {
    const newTodo = await todoRepository.createTodo(todoData);
    return newTodo;
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
) => {
    const updatedTodo = await todoRepository.updateTodo(id, todoData);
    if (!updatedTodo) {
        throw new Error("Todo not found");
    }
    return updatedTodo;
};

export const deleteTodo = async (id: string) => {
    const deletedTodo = await todoRepository.deleteTodo(id);
    if (!deletedTodo) {
        throw new Error("Todo not found");
    }
    return deletedTodo;
};

export const deleteAllTodos = async () => {
    const result = await todoRepository.deleteAllTodos();
    return result;
};

