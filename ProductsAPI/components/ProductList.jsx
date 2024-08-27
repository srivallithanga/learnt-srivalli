import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Typography, Container, TextField, Grid, MenuItem, Button } from '@mui/material';
import DataTable from 'react-data-table-component';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../api';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchPrice, setSearchPrice] = useState('');
    const [searchAvailability, setSearchAvailability] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await api.get('/products');
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, []);

    const handleSearchByName = async () => {
        try {
            const response = await api.get(`/products/search/name/${searchName}`);
            setFilteredProducts(response.data);
        } catch (error) {
            console.error('Error searching by name:', error);
        }
    };

    const handleSearchByPrice = async () => {
        try {
            const response = await api.get(`/products/search/price/${searchPrice}`);
            setFilteredProducts(response.data);
        } catch (error) {
            console.error('Error searching by price:', error);
        }
    };

    const handleSearchByAvailability = async () => {
        try {
            if (searchAvailability === '') {
                // If searchAvailability is empty, reset to all products
                setFilteredProducts(products);
            } else {
                const response = await api.get(`/products/search/availability/${searchAvailability}`);
                setFilteredProducts(response.data);
            }
        } catch (error) {
            console.error('Error searching by availability:', error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await api.delete(`/products/${id}`);
            setProducts(products.filter(product => product._id !== id));
            setFilteredProducts(filteredProducts.filter(product => product._id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Price',
            selector: row => `₹ ${row.price}`,
            sortable: true,
        },
        {
            name: 'Availability',
            selector: row => row.availability,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => (
                <>
                    <IconButton component={Link} to={`/product/${row._id}`} color="primary">
                        <VisibilityIcon />
                    </IconButton>
                    <IconButton component={Link} to={`/product/edit/${row._id}`} color="primary">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteProduct(row._id)} color="secondary">
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
            <Grid container spacing={2} style={{ marginBottom: 20 }}>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Search by Name"
                        fullWidth
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                    <Button onClick={handleSearchByName} variant="contained" color="primary" style={{ marginTop: 8 }}>
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
                    <Button onClick={handleSearchByPrice} variant="contained" color="primary" style={{ marginTop: 8 }}>
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
                    <Button onClick={handleSearchByAvailability} variant="contained" color="primary" style={{ marginTop: 8 }}>
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
