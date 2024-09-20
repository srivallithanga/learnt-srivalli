import React, { useState } from 'react';
import axios from 'axios';
import { Snackbar, TextField, Button, Alert, Typography, Box } from '@mui/material';
import SmileyRating from './SmileyRating'; // Import the custom SmileyRating component

const RateService = ({ bookingId, onClose }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:3000/api/booking/${bookingId}`, {
        rating,
        feedback,
      });

      setSuccess('Rating submitted successfully!');
      setRating(0);
      setFeedback('');
      if (onClose) onClose(); // Close the form if a callback is provided
    } catch (error) {
      setError('Failed to submit rating. Please try again.');
    }
  };

  return (
    <Box p={2} sx={{ backgroundColor: '#f4f6f8', borderRadius: '8px', border: '1px solid #2f4b6e' }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#2f4b6e' }}>
        Rate Service
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <Typography variant="body1" sx={{ color: '#2f4b6e', mb: 1 }}>
            Rating:
          </Typography>
          <SmileyRating
            rating={rating}
            onChange={handleRatingChange}
            iconColor="#2f4b6e" // Pass color prop if used in SmileyRating component
          />
        </Box>
        <TextField
          label="Feedback"
          multiline
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ backgroundColor: '#2f4b6e', '&:hover': { backgroundColor: '#2a3c59' } }}>
          Submit
        </Button>
      </form>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error" sx={{ backgroundColor: '#2f4b6e', color: '#fff' }}>{error}</Alert>
      </Snackbar>
      <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess('')}>
        <Alert onClose={() => setSuccess('')} severity="success" sx={{ backgroundColor: '#2f4b6e', color: '#fff' }}>{success}</Alert>
      </Snackbar>
    </Box>
  );
};

export default RateService;
