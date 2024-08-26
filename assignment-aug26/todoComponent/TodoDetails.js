import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Paper, Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";

function TodoDetails() {
    const [todoData, setTodoData] = useState({});
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

    return (
        <Container maxWidth="sm" sx={{ padding: 2 }}>
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h4" component="div" gutterBottom>
                    {todoData.name}
                </Typography>
                <Divider sx={{ marginY: 2 }} />
                <Typography variant="body1" gutterBottom>
                    <strong>Status:</strong> {todoData.status}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Todo ID:</strong> {todoData._id}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Description:</strong> {todoData.description}
                </Typography>
                <Divider sx={{ marginY: 2 }} />
                <Button 
                    variant="contained" 
                    color="primary" 
                    component={Link} 
                    to={`edit`}
                >
                    Edit Todo
                </Button>
            </Paper>
        </Container>
    );
}

export default TodoDetails;
