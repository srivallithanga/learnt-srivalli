import React from 'react';
import TodoItem from './TodoItem';
import { Container, Grid, Paper } from '@mui/material';

function TodoList({ todos, DeleteTodo }) {
    return (
        <Container maxWidth="md" sx={{ padding: 2 }}>
            <Grid container spacing={2}>
                {todos.map((val) => (
                    <Grid item xs={12} sm={6} md={4} key={val._id}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <TodoItem 
                                val={val}
                                DeleteTodo={DeleteTodo} 
                            />
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default TodoList;
