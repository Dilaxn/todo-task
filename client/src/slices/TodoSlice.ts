import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

interface Todo {
    _id?: string;
    title: string;
    deadline?: Date;
    status: string;
    priority: string;
    order: number;
}

interface TodoState {
    filterStatus: string;
    todoList: Todo[];
}

// we can do in a seperate service layer like (services/api) for this small app iam using in this same file
const API_URL = process.env.BASE_URL || "/api/v1/todo";

export const fetchTodos = createAsyncThunk("/todo/fetch", async () => {
    const response = await axios.get(API_URL);
    console.log("response.data", response.data);

    return response.data as Todo[];
});

export const addTodo = createAsyncThunk("/todo/add", async (newTodo: Todo) => {
    const response = await axios.post(API_URL, newTodo);
    return response.data as Todo;
});

export const deleteTodo = createAsyncThunk(
    "/todo/delete",
    async (todoToDelete: Todo) => {
        await axios.delete(`${API_URL}/${todoToDelete._id}`);
        return todoToDelete;
    }
);

export const updateTodo = createAsyncThunk(
    "/todo/update",
    async (updatedTodo: Todo) => {
        console.log("updatedTodo", updatedTodo);

        const response = await axios.put(
            `${API_URL}/${updatedTodo._id}`,
            updatedTodo
        );
        return response.data as Todo;
    }
);

export const deleteAllTasks = createAsyncThunk("/todo/deleteAll", async () => {
    await axios.delete(API_URL);
    return [] as Todo[];
});

const initialState: TodoState = {
    filterStatus: "all",
    todoList: [],
};

export const TodoSlice = createSlice({
    name: "Todo",
    initialState,
    reducers: {
        updateFilterStatus: (state, action: PayloadAction<string>) => {
            state.filterStatus = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todoList = action.payload;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.todoList.push(action.payload);
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.todoList = state.todoList.filter(
                    (todo) => todo._id !== action.payload._id
                );
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                const updatedTodoIndex = state.todoList.findIndex(
                    (todo) => todo._id === action.payload._id
                );
                if (updatedTodoIndex !== -1) {
                    state.todoList[updatedTodoIndex] = action.payload;
                }
            })
            .addCase(deleteAllTasks.fulfilled, (state, action) => {
                state.todoList = action.payload;
            });
    },
});

export const { updateFilterStatus } = TodoSlice.actions;

export const useTodoInitialization = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchTodos);
    }, [dispatch]);
};

export default TodoSlice.reducer;
