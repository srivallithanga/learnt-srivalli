import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RateService from './RateService'; 
import { Container, Typography, Box, Button, CircularProgress, Card, CardContent, Divider, Paper, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Star, Close } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import feedback from './feedbackbg.png';


const primaryColor = '#2f4b6e';
const secondaryColor = '#4b6f8f';


const LayoutContainer = styled(Container)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr', 
  gridTemplateRows: 'auto', 
  height: '100vh',
  gap: theme.spacing(2),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderLeft: `4px solid ${primaryColor}`, 
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  maxWidth: 600, 
  height: 'auto', 
  margin: '0 auto', 
  padding: theme.spacing(2),
}));

const CardContentStyled = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: primaryColor,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: secondaryColor,
  },
  transition: 'background-color 0.3s',
}));

const ImageContainer = styled(Paper)(({ theme }) => ({
  backgroundImage: `url(${feedback})`, 
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  gridColumn: '2 / 3',
  width: '100%', 
  height: '77%', 
  marginTop: '12%',
  borderRadius: theme.shape.borderRadius,
}));

const BookingDetailsPage = () => {
  const { id } = useParams(); 
  const [booking, setBooking] = useState(null);
  const [showRatingForm, setShowRatingForm] = useState(false); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/booking/${id}`);
        setBooking(response.data);
        setError(null); 
      } catch (error) {
        setError('Error fetching booking details. Please try again later.');
        console.error('Error fetching booking:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBooking();
    }
  }, [id]);

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress color="primary" />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Typography variant="h6" color="error">{error}</Typography>
        </Box>
      </Container>
    );
  }

  if (!booking) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Typography variant="h6">Booking not found</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <LayoutContainer>
      <Box>
        <Header>
          <Typography variant="h4" gutterBottom sx={{ color: primaryColor }}>
            Booking Details
          </Typography>
        </Header>

        <StyledCard>
          <CardContentStyled>
            <Typography variant="h6" gutterBottom>Service:</Typography>
            <Typography variant="body1">{booking.service?.name || 'N/A'}</Typography>

            <Divider sx={{ my: 1, borderColor: primaryColor }} />

            <Typography variant="h6" gutterBottom>Provider:</Typography>
            <Typography variant="body1">{booking.provider?.username || 'N/A'}</Typography>

            <Divider sx={{ my: 1, borderColor: primaryColor }} />

            <Typography variant="h6" gutterBottom>Category:</Typography>
            <Typography variant="body1">{booking.category?.name || 'N/A'}</Typography>

            <Divider sx={{ my: 1, borderColor: primaryColor }} />

            <Typography variant="h6" gutterBottom>Rating:</Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="body1" sx={{ mr: 1 }}>{booking.rating || 'Not rated yet'}</Typography>
              <Star color={booking.rating ? 'primary' : 'disabled'} />
            </Box>

            <Divider sx={{ my: 1, borderColor: primaryColor }} />

            <Typography variant="h6" gutterBottom>Feedback:</Typography>
            <Typography variant="body1">{booking.feedback || 'No feedback yet'}</Typography>
          </CardContentStyled>
        </StyledCard>
        <br />

        <StyledButton
          variant="contained"
          size="large"
          onClick={() => setShowRatingForm(true)} 
        >
          Rate Service
        </StyledButton>

        {/* Dialog to show RateService component as a popup */}
        <Dialog open={showRatingForm} onClose={() => setShowRatingForm(false)} fullWidth maxWidth="sm">
          <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Rate Service</Typography>
              <IconButton onClick={() => setShowRatingForm(false)}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <RateService bookingId={id} onClose={() => setShowRatingForm(false)} />
          </DialogContent>
        </Dialog>
      </Box>
      <ImageContainer />
    </LayoutContainer>
  );
};

export default BookingDetailsPage;
