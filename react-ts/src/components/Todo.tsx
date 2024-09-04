import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoForms from "./TodoForms";
import TodoList from "./TodoList";
import './Todo.css'; 

interface Todo {
    name: string;
    status: string;
}

function Todo() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [todoEntered, setTodoEntered] = useState<string>("");
    const [statusEntered, setStatusEntered] = useState<string>("complete");
    const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

    useEffect(() => {
        getTodos();
    }, []);

    function changeTodoEntered(e: React.ChangeEvent<HTMLInputElement>) {
        setTodoEntered(e.target.value);
    }

    async function getTodos() {
        try {
            const response = await axios.get<Todo[]>("http://localhost:3000/todos");
            setTodos(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    function addTodo() {
        const newTodo = { name: todoEntered, status: statusEntered };
        axios
            .post("http://localhost:3000/todos", newTodo)
            .then((response) => {
                if (response.data.status === 1) {
                    getTodos();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function deleteTodo(indexToDelete: number) {
        axios
            .delete(`http://localhost:3000/todos/${indexToDelete}`)
            .then((response) => {
                getTodos();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function viewTodo(todo: Todo) {
        setSelectedTodo(todo);
    }

    return (
        <div className="todo-container">
            <TodoForms
                todoEntered={todoEntered}
                changeTodoEntered={changeTodoEntered}
                setStatusEntered={setStatusEntered}
                addTodo={addTodo}
            />
            <TodoList
                todos={todos}
                deleteTodo={deleteTodo}
                viewTodo={viewTodo}
            />
            {selectedTodo && (
                <div className="todo-details">
                    <h3>Viewing Todo</h3>
                    <p><strong>Name:</strong> {selectedTodo.name}</p>
                    <p><strong>Status:</strong> {selectedTodo.status}</p>
                    <button className="close-button" onClick={() => setSelectedTodo(null)}>Close</button>
                </div>
            )}
        </div>
    );
}

export default Todo;
