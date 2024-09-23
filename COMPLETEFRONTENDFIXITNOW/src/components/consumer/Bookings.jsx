import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  TextField,
  TableSortLabel,
  Grid,
  createTheme,
  ThemeProvider,
  IconButton,
  Box,
  TablePagination,
} from '@mui/material';
import { styled } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bg from '../background.avif';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2f4b6e',
    },
    secondary: {
      main: '#4b6e2f',
    },
  },
  typography: {
    h4: {
      fontWeight: 'bold',
      color: '#2f4b6e',
    },
  },
});

const BackgroundContainer = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `url(${bg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  zIndex: -1,
});

const Bookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serviceSearchTerm, setServiceSearchTerm] = useState('');
  const [providerSearchTerm, setProviderSearchTerm] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('service.name');
  const [page, setPage] = useState(0); // New state for pagination
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default to 5 rows per page

  const user = JSON.parse(localStorage.getItem('user'));
  const consumerId = user ? user._id : null;

  useEffect(() => {
    const fetchBookings = async () => {
      if (!consumerId) {
        console.error('No consumer ID found in local storage');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/api/booking/consumer/${consumerId}`);
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [consumerId]);

  const handleRequestSort = (property) => {
    const isAscending = orderBy === property && order === 'asc';
    setOrder(isAscending ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredBookings = bookings.filter((booking) => {
    const serviceMatch = booking.service.name.toLowerCase().includes(serviceSearchTerm.toLowerCase());
    const providerMatch = booking.provider.username.toLowerCase().includes(providerSearchTerm.toLowerCase());
    return serviceMatch && providerMatch;
  });

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    const aValue = orderBy.includes('.')
      ? orderBy.split('.').reduce((obj, key) => obj[key], a)
      : a[orderBy];

    const bValue = orderBy.includes('.')
      ? orderBy.split('.').reduce((obj, key) => obj[key], b)
      : b[orderBy];

    return order === 'asc'
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  // Handle pagination logic
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedBookings = sortedBookings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  const formatDateTime = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return new Date(dateString).toLocaleString('en-US', options).replace(',', '');
  };

  return (
    <ThemeProvider theme={theme}>
      <BackgroundContainer />
      <Container>
        <Grid container alignItems="center" spacing={1} marginTop="20px">
          <Grid item>
            <IconButton onClick={() => navigate('/')} color="primary">
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="h4" gutterBottom>
              My Bookings
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <TextField
              label="Search by Service"
              variant="outlined"
              margin="normal"
              value={serviceSearchTerm}
              onChange={(e) => setServiceSearchTerm(e.target.value)}
              sx={{ width: 250 }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Search by Provider"
              variant="outlined"
              margin="normal"
              value={providerSearchTerm}
              onChange={(e) => setProviderSearchTerm(e.target.value)}
              sx={{ width: 250 }}
            />
          </Grid>
        </Grid>
        {paginatedBookings.length === 0 ? (
          <Typography>No bookings found.</Typography>
        ) : (
          <>
            <TableContainer component={Paper} elevation={3} sx={{ marginTop: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: '#2f4b6e', color: 'white', fontWeight: 'bold' }}>
                      <TableSortLabel
                        active={orderBy === 'service.name'}
                        direction={orderBy === 'service.name' ? order : 'asc'}
                        onClick={() => handleRequestSort('service.name')}
                        sx={{ color: 'white !important' }}
                      >
                        Service
                      </TableSortLabel>
                    </TableCell>
                    <TableCell sx={{ backgroundColor: '#2f4b6e', color: 'white', fontWeight: 'bold' }}>
                      <TableSortLabel
                        active={orderBy === 'provider.username'}
                        direction={orderBy === 'provider.username' ? order : 'asc'}
                        onClick={() => handleRequestSort('provider.username')}
                        sx={{ color: 'white !important' }}
                      >
                        Provider
                      </TableSortLabel>
                    </TableCell>
                    <TableCell sx={{ backgroundColor: '#2f4b6e', color: 'white', fontWeight: 'bold' }}>
                      <TableSortLabel
                        active={orderBy === 'timeslot[0]'}
                        direction={orderBy === 'timeslot[0]' ? order : 'asc'}
                        onClick={() => handleRequestSort('timeslot[0]')}
                        sx={{ color: 'white !important' }}
                      >
                        Start Time
                      </TableSortLabel>
                    </TableCell>
                    <TableCell sx={{ backgroundColor: '#2f4b6e', color: 'white', fontWeight: 'bold' }}>
                      <TableSortLabel
                        active={orderBy === 'timeslot[1]'}
                        direction={orderBy === 'timeslot[1]' ? order : 'asc'}
                        onClick={() => handleRequestSort('timeslot[1]')}
                        sx={{ color: 'white !important' }}
                      >
                        End Time
                      </TableSortLabel>
                    </TableCell>
                    <TableCell sx={{ backgroundColor: '#2f4b6e', color: 'white', fontWeight: 'bold' }}>
                      <TableSortLabel
                        sx={{ color: 'white !important' }}
                      >
                        Status
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedBookings.map((booking, index) => (
                    <TableRow key={booking._id} sx={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                      <TableCell>{booking.service.name}</TableCell>
                      <TableCell>{booking.provider.username}</TableCell>
                      <TableCell>{formatDateTime(booking.timeslot[0])}</TableCell>
                      <TableCell>{formatDateTime(booking.timeslot[1])}</TableCell>
                      <TableCell>{booking.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={sortedBookings.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default Bookings;
