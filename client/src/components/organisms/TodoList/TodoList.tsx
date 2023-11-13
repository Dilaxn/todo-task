import React, { useState, FormEvent, useEffect } from "react";
import "./TodoList.css";
import Button from "../../atoms/Button/Button";
import TodoItem from "../../molecules/TodoItem/TodoItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllTasks,
  fetchTodos,
  updateFilterStatus,
  updateTodo,
} from "../../../slices/TodoSlice";
import { AppDispatch } from "../../../store";

interface AddTaskFormProps {
  darkTheme: boolean;
}

interface Task {
  _id: number;
  title: string;
  status: string;
  deadline: Date;
  priority: string;
  order: number;
}

const TodoList: React.FC<AddTaskFormProps> = ({ darkTheme }) => {
  const [title, setTitle] = useState<string>("");
  const initialFilterStatus = useSelector(
    (state: any) => state.todo.filterStatus
  );

  const [filterStatus, setFilterStatus] = useState(initialFilterStatus);

  const dispatch = useDispatch<AppDispatch>();

  const todo = useSelector((state: any) => state.todo.todoList);

  const sortedTodoList = [...todo];
  sortedTodoList.sort((a, b) => a.order - b.order);

  const filteredTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === "all") {
      return true;
    }
    return item.status === filterStatus;
  });

  const getTaskByOrder = (order: number) => {
    const task = todo.find((task: Task) => task.order === order);
    return task;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleFilter = (value: string) => {
    setFilterStatus(value);
    dispatch(updateFilterStatus(value));
  };

  const handleClear = () => {
    dispatch(deleteAllTasks());
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    let source = result.source.index;
    let destination = result.destination.index;
    const task = getTaskByOrder(source);

    dispatch(updateTodo({ ...task, order: destination }));
    console.log("source", source);
    console.log("destination", destination);

    if (destination > source) {
      for (let i = source; i < destination; i++) {
        const task = getTaskByOrder(i + 1);
        console.log("loop1 task", task);

        dispatch(updateTodo({ ...task, order: task?.order - 1 }));
      }
    } else {
      for (let i = destination; i < source; i++) {
        const task = getTaskByOrder(i);
        console.log("loop2 task", task);
        dispatch(updateTodo({ ...task, order: task?.order + 1 }));
      }
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className={`todo-list ${darkTheme ? "dark-theme" : ""}`}>
      <div className="todo-list-head">
        <Button className="button-no-outline left" onClick={() => handleSubmit}>
          {/* {todo && todo.filter((task: Task) => task.status === "active").length}{" "} */}
          items left
        </Button>
        <div className="button-no-outline middle">
          <Button
            className={`button-outline${
              filterStatus === "all" ? "-active" : ""
            }`}
            value="all"
            onClick={handleFilter}
          >
            All
          </Button>
          <Button
            className={`button-outline${
              filterStatus === "active" ? "-active" : ""
            }`}
            value="active"
            onClick={handleFilter}
          >
            Active
          </Button>
          <Button
            className={`button-outline${
              filterStatus === "completed" ? "-active" : ""
            }`}
            value="completed"
            onClick={handleFilter}
          >
            Completed
          </Button>
        </div>
        <Button className="button-no-outline right" onClick={handleClear}>
          Clear all tasks
        </Button>
      </div>
      {filteredTodoList && filteredTodoList.length > 0 ? (
        <div className="todo-list-ul">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="characters">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {filteredTodoList.map((task, _id) => {
                    return (
                      <Draggable
                        key={task.order}
                        draggableId={_id.toString()}
                        index={task.order}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TodoItem key={task._id} task={task} />
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      ) : (
        <div className="no-todos">
          <h2>NO TODOS</h2>
        </div>
      )}
    </div>
  );
};

export default TodoList;
