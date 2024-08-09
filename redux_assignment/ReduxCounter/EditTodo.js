import React from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editAction } from "../actions/todoactions";

const EditTodo = ({ todos }) => {
    const { index } = useParams();
    const todo = todos[index];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const editTodo = (e) => {
        e.preventDefault();
        const updatedTodo = { name: e.target.name.value, status: e.target.status.value };
        dispatch(editAction(parseInt(index), updatedTodo));
        navigate("/");
    };

    return (
        <div>
            <h2>Edit Todo</h2>
            <form onSubmit={editTodo}>
                <input type="text" name="name" defaultValue={todo.name} />
                <select name="status" defaultValue={todo.status}>
                    <option value="complete">Complete</option>
                    <option value="incomplete">Incomplete</option>
                </select>
                <button>Save Changes</button>
            </form>
        </div>
    );
};

export default EditTodo;
