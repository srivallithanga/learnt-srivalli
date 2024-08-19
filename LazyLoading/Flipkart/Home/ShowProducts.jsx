import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment-timezone';
import DataTable from 'react-data-table-component';
import { Button, Typography, Container, Paper, Box, TextField } from '@mui/material';
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
    { name: 'Price', selector: row => row.price, sortable: true },
  ];

  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredData = data.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Display All Products
        </Typography>
        <Paper>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              onChange={handleSearch}
              value={search}
            />
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
          </Box>
        </Paper>
        <Paper>
          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            paginationPerPage={5}  // Set default rows per page
            paginationRowsPerPageOptions={[3, 5, 10]}  // Options for rows per page
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