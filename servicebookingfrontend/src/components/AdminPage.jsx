import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText } from '@mui/material';

const AdminPage = () => {
    const [categories, setCategories] = useState([]);
    const [services, setServices] = useState([]);
    const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
    const [openServiceDialog, setOpenServiceDialog] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '', description: '', services: [] });
    const [newService, setNewService] = useState({ name: '', description: '' });

    // Fetch categories and services on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryResponse = await axios.get('http://localhost:3000/api/categories');
                setCategories(categoryResponse.data);
                const serviceResponse = await axios.get('http://localhost:3000/api/services');
                setServices(serviceResponse.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);

    // Handle changes in the new category form
    const handleCategoryChange = (e) => {
        setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
    };

    const handleServiceSelect = (event) => {
        setNewCategory({
            ...newCategory,
            services: event.target.value
        });
    };

    const handleServiceChange = (e) => {
        setNewService({ ...newService, [e.target.name]: e.target.value });
    };

    // Create a new category
    const createCategory = async () => {
        try {
            await axios.post('http://localhost:3000/api/categories', newCategory);
            setOpenCategoryDialog(false);
            // Refresh categories
            const response = await axios.get('http://localhost:3000/api/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error creating category', error);
        }
    };

    // Create a new service
    const createService = async () => {
        try {
            await axios.post('http://localhost:3000/api/services', newService);
            setOpenServiceDialog(false);
            // Refresh services
            const response = await axios.get('http://localhost:3000/api/services');
            setServices(response.data);
        } catch (error) {
            console.error('Error creating service', error);
        }
    };

    return (
        <div>
            <Button onClick={() => setOpenCategoryDialog(true)}>Create Category</Button>
            <Button onClick={() => setOpenServiceDialog(true)}>Create Service</Button>

            {/* Create Category Dialog */}
            <Dialog open={openCategoryDialog} onClose={() => setOpenCategoryDialog(false)}>
                <DialogTitle>Create Category</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Category Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newCategory.name}
                        onChange={handleCategoryChange}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newCategory.description}
                        onChange={handleCategoryChange}
                    />
                    <FormControl fullWidth>
                        <InputLabel>Services</InputLabel>
                        <Select
                            multiple
                            value={newCategory.services}
                            onChange={handleServiceSelect}
                            renderValue={(selected) => (
                                <div>
                                    {selected.map((value) => (
                                        <span key={value}>{services.find(s => s._id === value)?.name}, </span>
                                    ))}
                                </div>
                            )}
                        >
                            {services.map((service) => (
                                <MenuItem key={service._id} value={service._id}>
                                    <Checkbox checked={newCategory.services.indexOf(service._id) > -1} />
                                    <ListItemText primary={service.name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCategoryDialog(false)}>Cancel</Button>
                    <Button onClick={createCategory}>Create</Button>
                </DialogActions>
            </Dialog>

            {/* Create Service Dialog */}
            <Dialog open={openServiceDialog} onClose={() => setOpenServiceDialog(false)}>
                <DialogTitle>Create Service</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Service Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newService.name}
                        onChange={handleServiceChange}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newService.description}
                        onChange={handleServiceChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenServiceDialog(false)}>Cancel</Button>
                    <Button onClick={createService}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AdminPage;