import React from "react";
import './TodoForms.css'; 

interface TodoFormsProps {
    todoEntered: string;
    changeTodoEntered: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setStatusEntered: (status: string) => void;
    addTodo: () => void;
}

const TodoForms: React.FC<TodoFormsProps> = ({
    todoEntered,
    changeTodoEntered,
    setStatusEntered,
    addTodo,
}) => {
    return (
        <div className="todo-forms-container">
            <div className="todo-fields-container">
                <input
                    type="text"
                    name="todoitem"
                    value={todoEntered}
                    onChange={changeTodoEntered}
                    placeholder="Enter a new todo"
                    className="todo-input"
                />
                <select
                    onChange={(e) => setStatusEntered(e.target.value)}
                    defaultValue="complete"
                    className="todo-select"
                >
                    <option value="complete">Completed</option>
                    <option value="incomplete">Not Completed</option>
                </select>
                <button onClick={addTodo} className="todo-button">Add Todo</button>
            </div>
        </div>
    );
};

export default TodoForms;
