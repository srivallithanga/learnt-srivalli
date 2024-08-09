import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { addAction, deleteAction, deleteAllAction } from "../actions/todoactions";
import EditTodo from "./EditTodo";
import '../CSS/ReduxTodo.css';

const ReduxTodo = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos.todos);
    const navigate = useNavigate();

    const addTodo = (e) => {
        e.preventDefault();
        const todo = { name: e.target.name.value, status: e.target.status.value };
        dispatch(addAction(todo));
    };

    const handleDelete = (index) => {
        dispatch(deleteAction(index));
    };
    
    const handleDeleteAll = () => {
        dispatch(deleteAllAction());
    };

    return (
        <div className="todo-container">
            <form onSubmit={addTodo}>
                <input type="text" name="name" />
                <select name="status">
                    <option value="complete">Complete</option>
                    <option value="incomplete">Incomplete</option>
                </select>
                <button>Add Todo</button>
            </form>
    
            <button onClick={handleDeleteAll}>Delete All Todos</button>
    
            {todos.map((val, index) => (
                <div key={index} className="todo-item">
                    <div>Name: {val.name}</div>
                    <div>Status: {val.status}</div>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                    
                    <Link to={`/edit/${index}`}>
                        <button className="edit-btn">Edit</button>
                    </Link>
                </div>
            ))}
    
            <Routes>
                <Route
                    path="/edit/:index"
                    element={<EditTodo todos={todos} />}
                />
            </Routes>
        </div>
    );
    
};

export default ReduxTodo;
