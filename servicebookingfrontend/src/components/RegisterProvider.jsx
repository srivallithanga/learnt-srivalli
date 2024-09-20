import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../redux/actions/authActions';
import axios from 'axios';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Checkbox, ListItemText, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const RegisterProvider = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    mobile: '',
    services: [{ service: '', price: '' }], // Initialize with one service field
    categories: [],
    role: 'provider',
  });

  const [categories, setCategories] = useState([]);
  const [availableServices, setAvailableServices] = useState([]);
  const [selectedCategoryNames, setSelectedCategoryNames] = useState([]);
  const [selectedServiceNames, setSelectedServiceNames] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch categories and services from the API
    const fetchCategoriesAndServices = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categories');
        const categoryData = response.data;

        const extractedCategories = categoryData.map(cat => ({
          id: cat._id,
          name: cat.name,
          services: cat.services.map(service => ({
            id: service._id,
            name: service.name
          }))
        }));

        setCategories(extractedCategories);
      } catch (error) {
        console.error('Error fetching categories and services:', error);
      }
    };

    fetchCategoriesAndServices();
  }, []);

  const handleCategoryChange = (event) => {
    const selectedCategoryNames = event.target.value;

    const selectedServices = categories
      .filter(category => selectedCategoryNames.includes(category.name))
      .map(category => category.services)
      .flat();

    setAvailableServices(selectedServices);

    const selectedCategoryIds = categories
      .filter(category => selectedCategoryNames.includes(category.name))
      .map(category => category.id);

    setFormData({ 
      ...formData, 
      categories: selectedCategoryIds,
      services: [{ service: '', price: '' }] // Reset services when categories change
    });

    setSelectedCategoryNames(selectedCategoryNames);
    setSelectedServiceNames([]);
  };

  const handleServiceChange = (index, key, value) => {
    const updatedServices = [...formData.services];
    updatedServices[index][key] = value;

    setFormData({
      ...formData,
      services: updatedServices,
    });
  };

  const handleAddService = () => {
    setFormData({
      ...formData,
      services: [...formData.services, { service: '', price: '' }]
    });
  };

  const handleRemoveService = (index) => {
    const updatedServices = formData.services.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      services: updatedServices
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("At Register : ", formData);
      dispatch(register(formData));
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Mobile"
        value={formData.mobile}
        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
        required
        fullWidth
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Categories</InputLabel>
        <Select
          multiple
          value={selectedCategoryNames}
          onChange={handleCategoryChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.name}>
              <Checkbox checked={selectedCategoryNames.indexOf(category.name) > -1} />
              <ListItemText primary={category.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Dynamic Service Input */}
      {formData.services.map((serviceData, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Service</InputLabel>
            <Select
              value={serviceData.service}
              onChange={(e) => handleServiceChange(index, 'service', e.target.value)}
              fullWidth
            >
              {availableServices.map((service) => (
                <MenuItem key={service.id} value={service.id}>
                  {service.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Price"
            value={serviceData.price}
            onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
            required
            margin="normal"
            type="number"
          />

          {/* Add and Remove Service Buttons */}
          <IconButton onClick={() => handleAddService()} color="primary">
            <AddIcon />
          </IconButton>
          {index > 0 && (
            <IconButton onClick={() => handleRemoveService(index)} color="secondary">
              <RemoveIcon />
            </IconButton>
          )}
        </div>
      ))}

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Register as Provider
      </Button>
    </form>
  );
};

export default RegisterProvider;
