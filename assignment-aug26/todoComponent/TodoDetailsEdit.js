import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, TextField, MenuItem, Button, Paper, Typography } from "@mui/material";

function TodoDetailsEdit() {
    const [todoData, setTodoData] = useState({});
    const options = ["Completed", "Incomplete"];
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/todos/${id}`)
            .then(response => {
                setTodoData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    const editTodo = (e) => {
        e.preventDefault();
        const todoModifiedOb = {
            name: e.target.todoitem.value,
            status: e.target.status.value,
            description: e.target.description.value 
        };
        axios.put(`http://localhost:3000/todos/${id}`, todoModifiedOb)
            .then(response => {
                console.log("Todo updated successfully:", response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <Container maxWidth="sm" sx={{ padding: 2 }}>
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Edit Todo
                </Typography>
                <form onSubmit={editTodo}>
                    <TextField 
                        label="Todo Name"
                        name="todoitem"
                        value={todoData.name || ''}
                        onChange={(e) => setTodoData({ ...todoData, name: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField 
                        select 
                        label="Status"
                        name="status"
                        value={todoData.status || ''}
                        onChange={(e) => setTodoData({ ...todoData, status: e.target.value })}
                        fullWidth
                        margin="normal"
                    >
                        {options.map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField 
                        label="Description"
                        name="description"
                        value={todoData.description || ''} 
                        onChange={(e) => setTodoData({ ...todoData, description: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary"
                        sx={{ marginTop: 2 }}
                    >
                        Edit Todo
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

export default TodoDetailsEdit;
