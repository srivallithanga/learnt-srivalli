import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  IconButton,
  Typography,
  Container,
  TextField,
  Grid,
  MenuItem,
  Button,
} from '@mui/material';
import DataTable from 'react-data-table-component';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../api';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchPrice, setSearchPrice] = useState('');
  const [searchAvailability, setSearchAvailability] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchByName = useCallback(async () => {
    if (!searchName.trim()) return;

    try {
      const { data } = await api.get(`/products/search/name/${searchName}`);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error searching by name:', error);
    }
  }, [searchName]);

  const handleSearchByPrice = useCallback(async () => {
    if (!searchPrice.trim()) return;

    try {
      const { data } = await api.get(`/products/search/price/${searchPrice}`);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error searching by price:', error);
    }
  }, [searchPrice]);

  const handleSearchByAvailability = useCallback(async () => {
    if (searchAvailability === '') {
      setFilteredProducts(products);
      return;
    }

    try {
      const { data } = await api.get(
        `/products/search/availability/${searchAvailability}`
      );
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error searching by availability:', error);
    }
  }, [searchAvailability, products]);

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      const updatedProducts = products.filter((product) => product._id !== id);
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Price',
      selector: (row) => `₹ ${row.price}`,
      sortable: true,
    },
    {
      name: 'Availability',
      selector: (row) => row.availability,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <IconButton component={Link} to={`/product/${row._id}`} color="primary">
            <VisibilityIcon />
          </IconButton>
          <IconButton
            component={Link}
            to={`/product/edit/${row._id}`}
            color="primary"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => deleteProduct(row._id)}
            color="secondary"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Search by Name"
            fullWidth
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <Button
            onClick={handleSearchByName}
            variant="contained"
            color="primary"
            sx={{ mt: 1 }}
          >
            Search by Name
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Search by Price"
            type="number"
            fullWidth
            value={searchPrice}
            onChange={(e) => setSearchPrice(e.target.value)}
          />
          <Button
            onClick={handleSearchByPrice}
            variant="contained"
            color="primary"
            sx={{ mt: 1 }}
          >
            Search by Price
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Search by Availability"
            select
            fullWidth
            value={searchAvailability}
            onChange={(e) => setSearchAvailability(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="available">Available</MenuItem>
            <MenuItem value="not available">Not Available</MenuItem>
          </TextField>
          <Button
            onClick={handleSearchByAvailability}
            variant="contained"
            color="primary"
            sx={{ mt: 1 }}
          >
            Search by Availability
          </Button>
        </Grid>
      </Grid>
      <DataTable
        columns={columns}
        data={filteredProducts}
        pagination
        highlightOnHover
        pointerOnHover
        responsive
        striped
      />
    </Container>
  );
}

export default ProductList;
