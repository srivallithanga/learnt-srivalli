import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Container, Typography } from '@mui/material';
import api from '../api';

function ProductForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [availability, setAvailability] = useState('available');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, [id]);

  const fetchProductById = async (productId) => {
    try {
      const response = await api.get(`/products/${productId}`);
      setName(response.data.name);
      setPrice(response.data.price);
      setAvailability(response.data.availability);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const productData = { name, price, availability };

    try {
      if (id) {
        await api.put(`/products/${id}`, productData);
      } else {
        await api.post('/products', productData);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {id ? 'Edit Product' : 'Add Product'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Price"
          type="number"
          fullWidth
          margin="normal"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Availability</InputLabel>
          <Select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          >
            <MenuItem value="available">Available</MenuItem>
            <MenuItem value="not available">Not Available</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Save Product
        </Button>
      </form>
    </Container>
  );
}

export default ProductForm;
