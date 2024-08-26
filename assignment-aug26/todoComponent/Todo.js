import { useEffect, useState } from "react";
import axios from "axios";
import TodoForms from "./TodoForms";
import TodoList from "./TodoList";
import { Container, Typography, Button, Paper, Divider } from "@mui/material";

function Todo() {
    const InitialTodo = [{ name: "default name", status: "default status", description: "default description" }];
    const [todos, setTodos] = useState(InitialTodo);
    const [todoEntered, setTodoEntered] = useState("");
    const [statusEntered, setStatus] = useState("completed");
    const [descriptionEntered, setDescriptionEntered] = useState("");

    useEffect(() => {
        console.log("Function is called on load");
        getTodos();
    }, []);

    const changeTodo = (e) => {
        setTodoEntered(e.target.value);
    };

    const changeDescription = (e) => {
        setDescriptionEntered(e.target.value); 
    };

    const addTodo = () => {
        const newTodo = {
            name: todoEntered,
            status: statusEntered,
            description: descriptionEntered 
        };
        axios.post("http://localhost:3000/todos", newTodo)
            .then(response => {
                getTodos(); 
            })
            .catch(error => {
                console.log(error);
            });
    };

    const DeleteTodo = (id) => {
        axios.delete(`http://localhost:3000/todos/${id}`)
            .then(response => {
                getTodos(); 
            })
            .catch(error => {
                console.log(error);
            });
    };

    const clearTodo = async () => {
        try {
            await Promise.all(
                todos.map(todo => axios.delete(`http://localhost:3000/todos/${todo._id}`))
            );
            setTodos([]);
        } catch (error) {
            console.log(error);
        }
    };

    const getTodos = async () => {
        try {
            const response = await axios.get("http://localhost:3000/todos");
            setTodos(response.data); 
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container maxWidth="md" sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Todo List
            </Typography>
            <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
                <TodoForms 
                    todoEntered={todoEntered}
                    changeTodo={changeTodo}
                    descriptionEntered={descriptionEntered} 
                    changeDescription={changeDescription}
                    setStatus={setStatus}
                    addTodo={addTodo}
                />
            </Paper>
            <Divider />
            <TodoList todos={todos} DeleteTodo={DeleteTodo} />
            <Button 
                variant="contained" 
                color="secondary" 
                onClick={clearTodo}
                sx={{ marginTop: 2 }}
            >
                Clear All Todos
            </Button>
        </Container>
    );
}

export default Todo;
