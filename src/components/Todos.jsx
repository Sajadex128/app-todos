import { useState } from "react";
import TodoList from "./TodoList";

export default function Todos() {
  const [todos, setTodos] = useState([]);

  const [newTodoTitle, setNewTodoTitle] = useState("");

  const onInputNewTodoChangeHandler = (event) => {
    setNewTodoTitle(event.target.value);
  };

  const addNewTodoHandler = (event) => {
    if (event.key === "Enter" && newTodoTitle !== "") {
      console.log("add a new todo");
      setTodos([
        ...todos,
        {
          time: Date.now() + Math.floor(Math.random() * 100),
          title: event.target.value,
          status: false,
        },
      ]);

      setNewTodoTitle("");
    }
  };

  const deleteTodoHandler = (todo) => {
    let newTodos = todos.filter((todoItem) => {
      return todo.time !== todoItem.time;
    });
    setTodos(newTodos);
  };

  const toggleTodoStatuseHandler = (todo) => {
    let newTodos = todos.map((todoItem) => {
      if (todo.time === todoItem.time) {
        todoItem.status = !todoItem.status;
      }
      return todoItem;
    });
    setTodos(newTodos);
  };

  const editTodoTitleHandler = (todo, newTitleValue) => {
    let newTodos = todos.map((todoItem) => {
      if (todo.time === todoItem.time) {
        todoItem.title = newTitleValue;
      }
      return todoItem;
    });
    setTodos(newTodos);
  };

  return (
    <div className="flex items-center justify-center h-screen p-4">
      <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3 rounded-3xl bg-white max-h-[90vh] flex flex-col">
        <div className="flex items-center mb-6">
          <h1 className="mr-6 text-4xl font-bold text-sky-600"> TO DO APP</h1>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="What needs to be done today?"
            onChange={onInputNewTodoChangeHandler}
            onKeyDown={addNewTodoHandler}
            value={newTodoTitle}
            className="w-full px-2 py-3 border outline-none rounded-2xl border-grey-600"
          />
        </div>
        <div className="flex-1 overflow-y-auto mt-4">
          <TodoList
            todos={todos}
            deleteTodo={deleteTodoHandler}
            toggleTodoStatus={toggleTodoStatuseHandler}
            editTodoTitle={editTodoTitleHandler}
          />
        </div>
      </div>
    </div>
  );
}
