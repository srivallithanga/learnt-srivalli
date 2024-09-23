import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Grid,
  Container,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Avatar,
  Box,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/system';
import bg from '../background.avif';
// Styled Avatar for Profile
const ProfileAvatar = styled(Avatar)({
  width: 100,
  height: 100,
  backgroundColor: '#2f4b6e',
  fontSize: '2rem',
  margin: '1rem auto',
});

// Background Container
const BackgroundContainer = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `url(${bg})`, // Replace with your image URL
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  zIndex: -1,
});

const ProfilePage = () => {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    mobile: '',
    address: '',
    password: ''
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/auth/consumer/${id}`);
        setUserDetails(response.data);
        setFormData({
          username: response.data.username,
          mobile: response.data.mobile,
          address: response.data.address
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveClick = async () => {
    try {
      const { password, ...dataToUpdate } = formData;
      await axios.put(`http://localhost:3000/api/auth/consumer/${id}`, dataToUpdate);
      setSnackbarMessage('Profile updated successfully!');
      setSnackbarOpen(true);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setSnackbarMessage('Error updating profile.');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (!userDetails) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <BackgroundContainer />
      <Container
        maxWidth="sm"
        sx={{
          padding: '2rem',
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent white
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          marginTop: '2rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Grid item>
            <IconButton onClick={() => navigate('/')} color='#2f4b6e'>
              <ArrowBackIcon />
            </IconButton>
          </Grid>
        <Grid container justifyContent="center" alignItems="center" direction="column">
          <ProfileAvatar>{formData.username.charAt(0).toUpperCase()}</ProfileAvatar>
          <Typography variant="h4" sx={{ color: '#2f4b6e', marginBottom: '1rem' }}>
            {formData.username}
          </Typography>
          <Grid item xs={12} sx={{ width: '100%' }}>
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              disabled={!isEditing}
              fullWidth
              margin="normal"
              sx={{ backgroundColor: '#fff' }}
            />
            <TextField
              label="Mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              disabled={!isEditing}
              fullWidth
              margin="normal"
              sx={{ backgroundColor: '#fff' }}
            />
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              disabled={!isEditing}
              fullWidth
              margin="normal"
              sx={{ backgroundColor: '#fff' }}
            />
          </Grid>
          <Grid item sx={{ width: '100%', marginTop: '1rem' }}>
            {isEditing ? (
              <Button variant="contained" sx={{ backgroundColor: '#2f4b6e', color: '#fff', width: '100%' }} onClick={handleSaveClick}>
                Save
              </Button>
            ) : (
              <Button variant="outlined" sx={{ color: '#2f4b6e', borderColor: '#2f4b6e', width: '100%' }} onClick={handleEditClick}>
                Edit
              </Button>
            )}
          </Grid>
        </Grid>

        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default ProfilePage;
