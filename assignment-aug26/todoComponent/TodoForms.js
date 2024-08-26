import React from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function TodoForms({ todoEntered, changeTodo, setStatus, addTodo, descriptionEntered, changeDescription }) {
    return (
        <div>
            <TextField
                value={todoEntered}
                onChange={changeTodo}
                label="Enter a Hobby"
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <TextField
                value={descriptionEntered}
                onChange={changeDescription}
                label="Enter a Description"
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                    defaultValue="completed" 
                    onChange={(e) => setStatus(e.target.value)}
                    label="Status"
                >
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="incomplete">In Complete</MenuItem>
                </Select>
            </FormControl>
            <Button
                variant="contained"
                color="primary"
                onClick={addTodo}
            >
                Add Todo
            </Button>
        </div>
    );
}

export default TodoForms;
