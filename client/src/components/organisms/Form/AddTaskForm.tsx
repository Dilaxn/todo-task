import React, { useState, FormEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { CiCirclePlus } from "react-icons/ci";
import "./AddTaskForm.css";
import Button from "../../atoms/Button/Button";
import { useSelector } from "react-redux";
import { addTodo } from "../../../slices/TodoSlice";
import { MdCheckCircleOutline, MdErrorOutline } from "react-icons/md";
import toast from "react-hot-toast";
import { AppDispatch } from "../../../store";

interface AddTaskFormProps {
  darkTheme: boolean;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ darkTheme }) => {
  const [title, setTitle] = useState<string>("");
  const [deadline, setDeadline] = useState<any>(new Date());
  const todo = useSelector((state: any) => state.todo.todoList);
  const [isCritical, setIsCritical] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const getLatestId = () => {
    const maxId = Math.max(...todo.map((item: any) => item._id), 0);
    return maxId;
  };

  const handleSubmit = (e: FormEvent) => {
    if (title && title !== "") {
      dispatch(
        addTodo({
          title,
          status: "active",
          deadline: deadline,
          priority: isCritical ? "High" : "Normal",
          order: todo.length + 1,
        })
      );
      setTitle("");
    } else {
      toast.error("Title cannot be empty!");
    }
  };

  useEffect(() => {
    const tomorrow = new Date(deadline);
    tomorrow.setDate(deadline.getDate() + 1);
    setDeadline(tomorrow);
  }, []);

  return (
    <div className={`add-task-form ${darkTheme ? "dark-theme" : ""}`}>
      <CiCirclePlus size={28} className="px-0 text-gray-500" />
      <input
        className="form-input"
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <DateTime
        inputProps={{
          placeholder: "Deadline",
          className: "calender",
        }}
        value={deadline}
        onChange={(date) => {
          setDeadline(date);
        }}
      />
      <div className="critical-toggle">
        <span className="priority">{isCritical ? "Critical" : "Normal"}</span>
        <div
          onClick={() => {
            toast.success(
              "Priority changed to " +
                (isCritical ? "Normal" : "Critical") +
                "!"
            );
            setIsCritical(!isCritical);
          }}
          className={`toggle-switch ${isCritical ? "critical" : "normal"}`}
        >
          {isCritical ? <MdErrorOutline /> : <MdCheckCircleOutline />}
        </div>
      </div>
      <Button className="button-outline" onClick={handleSubmit}>
        ADD
      </Button>
    </div>
  );
};

export default AddTaskForm;
