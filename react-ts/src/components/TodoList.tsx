import React from 'react';
import './TodoList.css'; 

interface Todo {
    name: string;
    status: string;
}

interface TodoListProps {
    todos: Todo[];
    deleteTodo: (index: number) => void;
    viewTodo: (todo: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, deleteTodo, viewTodo }) => {
    return (
        <div className="todo-list-container">
            {todos.length > 0 ? (
                <table className="todo-list-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((todo, index) => (
                            <tr key={index}>
                                <td>{todo.name}</td>
                                <td className={`todo-status ${todo.status}`}>{todo.status}</td>
                                <td>
                                    {/* <button className="todo-view-button" onClick={() => viewTodo(todo)}>View</button> */}
                                    <button className="todo-delete-button" onClick={() => deleteTodo(index)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="no-todos-message">No todos available</p>
            )}
        </div>
    );
};

export default TodoList;
