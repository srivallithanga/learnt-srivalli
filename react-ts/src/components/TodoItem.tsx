import React from "react";
import './TodoItem.css'; 

interface Todo {
  name: string;
  status: string;
}

interface TodoItemProps {
  val: Todo;
  index: number; 
  deleteTodo: (index: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ val, index, deleteTodo }) => {
  return (
      <div className="todo-item-container">
          <span className="todo-item-text">
            <span className="todo-name">{val.name}</span> - 
            <span className={`todo-status ${val.status}`}>{val.status}</span>
          </span>
          <button className="todo-delete-button" onClick={() => deleteTodo(index)}>Delete</button>
      </div>
  );
};

export default TodoItem;
