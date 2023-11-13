import React, { useEffect } from "react";
import "./Home.css";
import AddTaskForm from "../../organisms/Form/AddTaskForm";
import TodoList from "../../organisms/TodoList/TodoList";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { fetchTodos, updateTodo } from "../../../slices/TodoSlice";
import toast from "react-hot-toast";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTodos())
      .unwrap()
      .then(() => {
        toast.success("Task Updated successfully");
      })
      .catch((error: any) => {
        console.error("Error updating task:", error);
        toast.error("Failed to update task");
      });
  }, []);

  return (
    <div className="home">
      <div className="side"></div>
      <div className="middle">
        <AddTaskForm darkTheme={false} />
        <TodoList darkTheme={false} />
      </div>
      <div className="side"></div>
    </div>
  );
};

export default Home;
