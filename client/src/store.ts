import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/TodoSlice";

// Define the RootState type based on your Redux store structure
type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
    reducer: {
        todo: todoReducer,
    },
});

// Define the AppDispatch type to dispatch actions from your store
export type AppDispatch = typeof store.dispatch;
