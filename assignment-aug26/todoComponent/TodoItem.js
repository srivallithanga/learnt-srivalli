import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Divider } from '@mui/material';

function TodoItem({ val, DeleteTodo }) {
    return (
        <Card sx={{ marginBottom: 2 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {val.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Description: {val.description}
                </Typography>
                <Divider sx={{ marginY: 1 }} />
                <Button 
                    variant="contained" 
                    color="error" 
                    onClick={() => DeleteTodo(val._id)}
                    sx={{ marginRight: 1 }}
                >
                    Delete
                </Button>
                <Button 
                    variant="outlined" 
                    component={Link} 
                    to={`${val._id}`}
                >
                    View Todo
                </Button>
            </CardContent>
        </Card>
    );
}

export default TodoItem;
