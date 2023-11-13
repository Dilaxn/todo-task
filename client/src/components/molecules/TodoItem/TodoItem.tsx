import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import { MdCheck } from "react-icons/md";
import "./TodoItem.css";
import { colors } from "../../const/colors";
import { deleteTodo, updateTodo } from "../../../slices/TodoSlice";
import DateTime from "react-datetime";
import toast from "react-hot-toast";
import { AppDispatch } from "../../../store";

interface TaskProps {
  task: {
    _id: string;
    title: string;
    deadline: Date;
    status: string;
    priority: string;
    order: number;
  };
}

const TodoItem: React.FC<TaskProps> = ({ task }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [deadline, setDeadline] = useState(task.deadline);
  const [status, setStatus] = useState(task.status); // ["active", "completed"]
  const [remain, setRemain] = useState("");
  const [flag, setFlag] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const calculateTimeRemaining = (deadlineString: Date) => {
    const now = new Date();

    const deadline = new Date(deadlineString);

    const timeDiff = deadline.getTime() - now.getTime();

    if (timeDiff <= 0) {
      return "Overdue";
    }

    const daysRemaining = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    return `${daysRemaining}D ${hoursRemaining}H`;
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const completeEdit = () => {
    if (task.title !== title || task.deadline !== deadline) {
      const newTodo = { ...task, title, deadline };
      dispatch(updateTodo(newTodo))
        .unwrap()
        .then(() => {
          setFlag(!flag);
          toast.success("Task Updated successfully");
        })
        .catch((error: any) => {
          console.error("Error updating task:", error);
          toast.error("Failed to update task");
        });
    } else {
      toast.error("No changes made");
    }
    setEditing(false);
  };

  const completeToggle = () => {
    if (status === "completed") {
      dispatch(updateTodo({ ...task, status: "active" }));
      setStatus("active");
      toast.success("Task Undo successfully");
    } else {
      dispatch(updateTodo({ ...task, status: "completed" }));
      setStatus("completed");
      toast.success("Task Completed successfully");
    }
  };

  useEffect(() => {
    const r = calculateTimeRemaining(task?.deadline);
    setRemain(r);
  }, [flag]);

  const handleDelete = (value: any) => {
    dispatch(deleteTodo(value));
    toast.success("Task Deleted successfully");
  };

  return editing ? (
    <form>
      <ul>
        <li
          className={`task-item ${
            editing ? "editing" : task.priority === "High" ? "critical" : ""
          }`}
        >
          <div className="left">
            <input
              className="task-input"
              type="text"
              placeholder="Update task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="right">
            <DateTime
              inputProps={{
                placeholder: "Deadline",
                style: {
                  border: "none",
                  outline: "none",
                },
              }}
              value={deadline}
              onChange={(date: any) => {
                setDeadline(date);
              }}
            />
            <button className="button-no-outline" onClick={completeEdit}>
              <CiEdit size={18} className="task-icon" />
            </button>
            <button
              className="button-no-outline"
              value={task._id}
              onClick={() => handleDelete(task)}
            >
              <AiOutlineDelete size={18} className="task-icon" />
            </button>
          </div>
        </li>
      </ul>
    </form>
  ) : (
    <ul>
      <li
        className={`task-item ${
          editing ? "editing" : task.priority === "High" ? "critical" : ""
        }`}
      >
        <div className="left">
          <span
            className={`task-title ${
              status === "completed" ? "task-completed" : ""
            }`}
          >
            {title}
          </span>
        </div>
        <div className="right">
          <span
            className={`deadline${status === "completed" ? "-disabled" : ""}`}
          >
            {remain}
          </span>
          {/* <button className="button-no-outline" onClick={handleFlagToggle}>
          {flagged ? (
            <AiFillFlag
              size={18}
              color={colors.flagged}
              className="task-icon"
            />
          ) : (
            <AiOutlineFlag size={18} className="task-icon" />
          )}
        </button> */}
          <button className="button-no-outline" onClick={completeToggle}>
            {status === "completed" ? (
              <AiOutlineClose
                size={18}
                color="your-color"
                className="task-icon"
              />
            ) : (
              <MdCheck size={18} color={colors.hash} className="task-icon" />
            )}
          </button>
          <button className="button-no-outline" onClick={handleEdit}>
            <CiEdit size={18} className="task-icon" />
          </button>
          <button
            className="button-no-outline"
            value={task._id}
            onClick={() => handleDelete(task)}
          >
            <AiOutlineDelete size={18} className="task-icon" />
          </button>
        </div>
      </li>
    </ul>
  );
};

export default TodoItem;
