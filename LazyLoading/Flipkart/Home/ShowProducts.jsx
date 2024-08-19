import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment-timezone';
import DataTable from 'react-data-table-component';
import { Button, Typography, Container, Paper, Box, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
    text: {
      primary: '#333',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: 16,
          marginBottom: 16,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          marginRight: 8,
        },
      },
    },
  },
});

function ShowProducts() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    displayProducts();
  }, []);

  useEffect(() => {
    if (id) {
      viewProductDetails(id);
    }
  }, [id]);

  const displayProducts = () => {
    const url = "http://localhost:3000/api/v1/products";
    axios.get(url)
      .then(response => {
        setData(response.data.products);
      })
      .catch(error => {
        console.error(error);
        alert("Error fetching products.");
      });
  };

  const viewProductDetails = (productId) => {
    axios.get(`http://localhost:3000/api/v1/products/${productId}`)
      .then(response => {
        navigate(`/ShowProducts/${productId}`);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const deleteData = (productId) => {
    axios.delete(`http://localhost:3000/api/v1/products/${productId}`)
      .then(() => {
        displayProducts();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const bulkDelete = () => {
    const promises = selectedRows.map(row => axios.delete(`http://localhost:3000/api/v1/products/${row._id}`));
    Promise.all(promises)
      .then(() => {
        displayProducts();
        setSelectedRows([]);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const formatCreatedAt = (createdAt) => {
    return moment.utc(createdAt).tz('Asia/Kolkata').format('DD-MMM-YY');
  };

  const columns = [
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'Category', selector: row => row.category.name, sortable: true },
    { name: 'Excerpt', selector: row => row.excerpt, sortable: true },
    { name: 'Price', selector: row => row.price, sortable: true },
  ];

  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handlePriceFilterChange = (event) => {
    setPriceFilter(event.target.value);
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const filterByPriceRange = (product) => {
    switch (priceFilter) {
      case 'below_100':
        return product.price < 100;
      case '100_200':
        return product.price >= 100 && product.price < 200;
      case '200_300':
        return product.price >= 200 && product.price < 300;
      case 'above_300':
        return product.price >= 300;
      default:
        return true;
    }
  };

  const filteredData = data
    .filter(product =>
      (product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.excerpt.toLowerCase().includes(search.toLowerCase())) &&
      filterByPriceRange(product) &&
      (categoryFilter === '' || product.category.name === categoryFilter)
    );

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Display All Products
        </Typography>
        <Paper>
          <Box display="flex" justifyContent="flex-end" gap={2} mb={2}>
            <TextField
              label="Search by Name or Excerpt"
              variant="outlined"
              onChange={handleSearch}
              value={search}
              sx={{ width: 200 }}
            />
            <FormControl variant="outlined" sx={{ width: 200 }}>
              <InputLabel>Filter by Price</InputLabel>
              <Select
                label="Filter by Price"
                value={priceFilter}
                onChange={handlePriceFilterChange}
              >
                <MenuItem value="">All Prices</MenuItem>
                <MenuItem value="below_100">Below 100</MenuItem>
                <MenuItem value="100_200">100-200</MenuItem>
                <MenuItem value="200_300">200-300</MenuItem>
                <MenuItem value="above_300">Above 300</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" sx={{ width: 200 }}>
              <InputLabel>Filter by Category</InputLabel>
              <Select
                label="Filter by Category"
                value={categoryFilter}
                onChange={handleCategoryFilterChange}
              >
                <MenuItem value="">All Categories</MenuItem>
                {data
                  .map(product => product.category.name)
                  .filter((value, index, self) => self.indexOf(value) === index)
                  .map(category => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={bulkDelete}
              startIcon={<DeleteIcon />}
              disabled={selectedRows.length === 0}
            >
              Delete Selected
            </Button>
          </Box>
        </Paper>
        <Paper>
          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            paginationPerPage={5}
            paginationRowsPerPageOptions={[3, 5, 10]}
            selectableRows
            selectableRowsComponentProps={{ color: 'primary' }}
            onSelectedRowsChange={handleRowSelected}
            expandableRows
            expandOnRowClicked
            expandableRowsComponent={({ data }) => (
              <Paper style={{ padding: 16, marginTop: 8 }}>
                <Typography variant="body1"><b>Code:</b> {data.code}</Typography>
                <Typography variant="body1"><b>Name:</b> {data.name}</Typography>
                <Typography variant="body1"><b>Excerpt:</b> {data.excerpt}</Typography>
                <Typography variant="body1"><b>Category:</b> {data.category.name}</Typography>
                <Typography variant="body1"><b>Status:</b> {data.status ? 'True' : 'False'}</Typography>
                <Typography variant="body1"><b>Price:</b> {data.price}</Typography>
                <Typography variant="body1"><b>Created At:</b> {formatCreatedAt(data.created_at)}</Typography>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => deleteData(data._id)}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </Paper>
            )}
            highlightOnHover
            pointerOnHover
          />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default ShowProducts;
