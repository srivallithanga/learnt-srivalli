import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImagesAction, verifyOtpAction, updateBookingStatusAction } from '../../redux/actions/verificationActions';
import { Box, Button, Card, CardMedia, Typography, TextField, Snackbar, Alert,IconButton } from '@mui/material';
import { styled } from '@mui/system';
import bg from '../background.avif';
const VerificationForm = () => {
    const dispatch = useDispatch();
    const { bookingId } = useParams();
    const { otpValidated, verificationError, bookingStatusUpdated } = useSelector(state => state);
    const navigate = useNavigate();

    const [images, setImages] = useState([null, null]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [maskedPhoneNumber, setMaskedPhoneNumber] = useState('');
    const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [otpMessage, setOtpMessage] = useState('');
    const otpRefs = useRef([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [isOtpFilled, setIsOtpFilled] = useState(false);

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
    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/booking/${bookingId}`);
                const bookingDetails = response.data;
                const rawPhoneNumber = bookingDetails.consumer.mobile.replace('+91', '');
                setPhoneNumber(rawPhoneNumber);
                setMaskedPhoneNumber('*'.repeat(rawPhoneNumber.length - 4) + rawPhoneNumber.slice(-4));
            } catch (error) {
                console.error('Error fetching booking details:', error);
            }
        };

        fetchBookingDetails();
    }, [bookingId]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const newImages = [...images];
            newImages[currentImageIndex] = URL.createObjectURL(file);
            setImages(newImages);
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 2);
        }
    };

    const handleUploadImages = () => {
        if (images[0] && images[1] && phoneNumber) {
            dispatch(uploadImagesAction(images[0], images[1], `+91${phoneNumber}`, bookingId));
            setOtpMessage(`OTP sent to ${maskedPhoneNumber}`);
        }
    };

    const handleOtpChange = (index, value) => {
        const newOtpDigits = [...otpDigits];
        newOtpDigits[index] = value.slice(-1);
        setOtpDigits(newOtpDigits);
        if (value && index < 5) {
            otpRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, event) => {
        if (event.key === 'Backspace' && index > 0 && otpDigits[index] === '') {
            otpRefs.current[index - 1].focus();
        }
    };

    const handleVerifyOtp = () => {
        const otpCode = otpDigits.join('');
        if (phoneNumber && otpCode.length === 6) {
            dispatch(verifyOtpAction(`+91${phoneNumber}`, otpCode));
        }
    };

    const handleSubmit = () => {
        if (bookingId) {
            dispatch(updateBookingStatusAction(bookingId, "completed"));
            navigate('/providers-bookings');
        }
    };

    useEffect(() => {
        if (otpValidated) {
            setSnackbarMessage('OTP verified successfully!');
            setSnackbarOpen(true);
            setIsOtpVerified(true);  // OTP is successfully verified
        }
    }, [otpValidated]);

    useEffect(() => {
        if (otpDigits.join('').length === 6) {
            setIsOtpFilled(true);  // OTP fields are completely filled
        } else {
            setIsOtpFilled(false);
        }
    }, [otpDigits]);

    useEffect(() => {
        if (bookingStatusUpdated) {
            alert('Booking status updated to complete!');
        }
    }, [bookingStatusUpdated]);

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
      <>
      <BackgroundContainer/>
      <Box sx={{ padding: '2rem', maxWidth: 600, margin: '60px auto', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ color: '#2f4b6e' }}>Verification Form</Typography>
            <input
                accept="image/*"
                type="file"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="upload-images"
            />
            <label htmlFor="upload-images">
                <Button variant="outlined" component="span" fullWidth sx={{ mb: 2, bgcolor: '#e0e0e0', borderColor: '#2f4b6e', color: '#2f4b6e' }}>
                    Select Images from Device
                </Button>
            </label>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                {images[0] && (
                    <Card sx={{ width: '45%', borderRadius: '8px' }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={images[0]}
                            alt="Before"
                        />
                        <Typography variant="h6" align="center">BEFORE</Typography>
                    </Card>
                )}
                {images[1] && (
                    <Card sx={{ width: '45%', borderRadius: '8px' }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={images[1]}
                            alt="After"
                        />
                        <Typography variant="h6" align="center">AFTER</Typography>
                    </Card>
                )}
            </Box>
            <TextField
                label="Phone Number"
                variant="outlined"
                value={maskedPhoneNumber}
                disabled
                fullWidth
                margin="normal"
                sx={{ bgcolor: '#f5f5f5' }}
            />
            <Button variant="contained" onClick={handleUploadImages} disabled={!images[0] || !images[1] || !phoneNumber} fullWidth sx={{ mb: 2, bgcolor: '#2f4b6e', '&:hover': { bgcolor: '#1e3d55' } }}>
                Upload Images
            </Button>
            {otpMessage && <Typography variant="body1" color="primary" sx={{ marginTop: '1rem', textAlign: 'center' }}>{otpMessage}</Typography>}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                {otpDigits.map((digit, index) => (
                    <input
                        key={index}
                        ref={el => (otpRefs.current[index] = el)}
                        type="text"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        maxLength={1}
                        style={{
                            width: '40px',
                            height: '40px',
                            border: 'none',
                            borderRadius: '4px',
                            borderBottom: '2px solid #2f4b6e',
                            textAlign: 'center',
                            margin: '0 5px',
                            outline: 'none',
                            fontSize: '18px',
                        }}
                    />
                ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <Button
                    variant="contained"
                    onClick={handleVerifyOtp}
                    disabled={!isOtpFilled} // Disable button if OTP is not fully filled
                    sx={{ flex: 1, marginRight: '1rem', bgcolor: '#2f4b6e', '&:hover': { bgcolor: '#1e3d55' } }}
                >
                    Verify OTP
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!isOtpFilled} // Disable button if OTP is not verified
                    sx={{ flex: 1, bgcolor: '#2f4b6e', '&:hover': { bgcolor: '#1e3d55' } }}
                >
                    Submit
                </Button>
            </Box>
            {verificationError && <Typography variant="body1" color="error" align="center" sx={{ mt: 2 }}>{verificationError}</Typography>}
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
      </>
        
    );
};

export default VerificationForm;
