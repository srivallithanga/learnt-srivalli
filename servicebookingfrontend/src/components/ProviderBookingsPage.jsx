import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProviderBookings } from '../services/api';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Tabs,
  Tab,
  Box,
  Chip,
  Collapse,
  IconButton,
  Typography,
  Tooltip,
  TextField,
} from '@mui/material';
import { selectUser } from './selectors';
import { KeyboardArrowDown, KeyboardArrowUp, AccessTime, CalendarToday } from '@mui/icons-material';

const ProviderBookingsPage = () => {
  const user = useSelector(selectUser);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTab, setCurrentTab] = useState(1); // Set to 1 for Ongoing tasks
  const [openRows, setOpenRows] = useState({});
  const [serviceFilter, setServiceFilter] = useState('');
  const [customerFilter, setCustomerFilter] = useState('');
  const navigate = useNavigate();
  const providerName = bookings.length > 0 ? bookings[0].provider.username : 'Provider';

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      if (user && user._id) {
        try {
          const response = await fetchProviderBookings(user._id);
          setBookings(response.data);
          setLoading(false);
        } catch (error) {
          setError('Failed to fetch bookings');
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const updateBookingStatuses = () => {
    const currentTime = new Date();
    setBookings((prevBookings) =>
      prevBookings.map((booking) => {
        const [startTime, endTime] = booking.timeslot.map((ts) => new Date(ts));
        let status;

        if (booking.status === 'completed') {
          status = 'completed';
        } else if (currentTime < startTime) {
          status = 'upcoming';
        } else if (currentTime >= startTime && currentTime <= endTime) {
          status = 'ongoing';
        } else {
          status = 'incomplete';
        }

        booking.status = status;
        return booking;
      })
    );
  };

  useEffect(() => {
    const intervalId = setInterval(updateBookingStatuses, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleVerificationButtonClick = (bookingId) => {
    navigate(`/verification/${bookingId}`);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const toggleRow = (bookingId) => {
    setOpenRows((prevState) => ({ ...prevState, [bookingId]: !prevState[bookingId] }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const filterBookingsByStatus = (status) => {
    return bookings.filter((booking) => booking.status === status);
  };

  const tabLabels = [
    { label: 'Completed', status: 'completed', color: 'success.main', noTasksMessage: 'No completed tasks' },
    { label: 'Ongoing', status: 'ongoing', color: 'primary.main', noTasksMessage: 'No ongoing tasks' },
    { label: 'Upcoming', status: 'upcoming', color: 'orange', noTasksMessage: 'No upcoming tasks' },
    { label: 'Incomplete', status: 'incomplete', color: 'error.main', noTasksMessage: 'No incomplete tasks' }
  ];

  const filteredBookings = filterBookingsByStatus(tabLabels[currentTab].status).filter((booking) => {
    return (
      booking.service.name.toLowerCase().includes(serviceFilter.toLowerCase()) &&
      booking.consumer.username.toLowerCase().includes(customerFilter.toLowerCase())
    );
  });

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333', textAlign: 'center' }}>
        {`${providerName} bookings`}
      </Typography>

      {/* Filters for Service and Customer */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          label="Service Name"
          variant="outlined"
          value={serviceFilter}
          onChange={(e) => setServiceFilter(e.target.value)}
          sx={{ width: '45%' }}
        />
        <TextField
          label="Customer Name"
          variant="outlined"
          value={customerFilter}
          onChange={(e) => setCustomerFilter(e.target.value)}
          sx={{ width: '45%' }}
        />
      </Box>

      {/* Tabs for different statuses */}
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        variant="fullWidth"
        indicatorColor="transparent"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        {tabLabels.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            sx={{
              position: 'relative',
              color: currentTab === index ? tab.color : 'inherit',
              '&.Mui-selected': {
                color: tab.color,
              },
              '&:hover': {
                color: tab.color,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: '2px',
                backgroundColor: currentTab === index ? tab.color : 'transparent',
              },
            }}
          />
        ))}
      </Tabs>

      {/* Check if there are no tasks */}
      {filteredBookings.length === 0 ? (
        <Typography sx={{ mt: 3, textAlign: 'center', color: '#888' }}>
          {tabLabels[currentTab].noTasksMessage}
        </Typography>
      ) : (
        <TableContainer sx={{ mt: 3 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell />
                <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>Service</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>Consumer</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>Start Time</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>End Time</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBookings.map((booking, index) => (
                <React.Fragment key={booking._id}>
                  <TableRow sx={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                    <TableCell>
                      <IconButton size="small" onClick={() => toggleRow(booking._id)}>
                        {openRows[booking._id] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                      </IconButton>
                    </TableCell>
                    <TableCell>{booking.service.name}</TableCell>
                    <TableCell>{booking.consumer.username}</TableCell>
                    <TableCell>
                      <Tooltip title="Date">
                        <Box display="flex" alignItems="center">
                          <CalendarToday sx={{ mr: 1 }} />
                          <Typography>
                            {new Date(booking.timeslot[0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </Typography>
                        </Box>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Start Time">
                        <Box display="flex" alignItems="center">
                          <AccessTime sx={{ mr: 1 }} />
                          <Typography>
                            {new Date(booking.timeslot[0]).toLocaleTimeString()}
                          </Typography>
                        </Box>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="End Time">
                        <Box display="flex" alignItems="center">
                          <AccessTime sx={{ mr: 1 }} />
                          <Typography>
                            {new Date(booking.timeslot[1]).toLocaleTimeString()}
                          </Typography>
                        </Box>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={booking.status}
                        sx={{
                          color: '#fff',
                          backgroundColor: tabLabels[currentTab].color,
                          textTransform: 'capitalize',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {booking.status === 'ongoing' && (
                        <Button variant="outlined" color="primary" onClick={() => handleVerificationButtonClick(booking._id)}>
                          Verify
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                      <Collapse in={openRows[booking._id]} timeout="auto" unmountOnExit>
                        <Box margin={2}>
                          <Typography variant="body1" gutterBottom>
                            Additional Information
                          </Typography>
                          <Typography variant="body2">Notes: {booking.notes || 'No additional notes'}</Typography>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ProviderBookingsPage;
