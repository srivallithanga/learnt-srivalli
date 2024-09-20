import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImagesAction, verifyOtpAction, updateBookingStatusAction } from '../redux/actions/verificationActions';

const VerificationForm = () => {
    const dispatch = useDispatch();
    const { bookingId } = useParams(); // Get bookingId from URL
    const { otpValidated, verificationError, bookingStatusUpdated } = useSelector(state => state);
    const navigate = useNavigate();

    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otpCode, setOtpCode] = useState('');

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/booking/${bookingId}`);
                const bookingDetails = response.data;

                // Assuming the phone number from backend includes +91, so remove it before setting state
                setPhoneNumber(bookingDetails.consumer.mobile.replace('+91', ''));
            } catch (error) {
                console.error('Error fetching booking details:', error);
            }
        };

        fetchBookingDetails();
    }, [bookingId]);

    const handleImage1Change = (e) => setImage1(e.target.files[0]);
    const handleImage2Change = (e) => setImage2(e.target.files[0]);
    const handleOtpCodeChange = (e) => setOtpCode(e.target.value);

    const handleUploadImages = () => {
        if (image1 && image2 && phoneNumber) {
            dispatch(uploadImagesAction(image1, image2, `+91${phoneNumber}`, bookingId));
        }
    };

    const handleVerifyOtp = () => {
        if (phoneNumber && otpCode) {
            dispatch(verifyOtpAction(`+91${phoneNumber}`, otpCode));
        }
    };

    const handleSubmit = () => {
        if (bookingId) {
            dispatch(updateBookingStatusAction(bookingId, "completed")); // Update booking status to complete (true)
            navigate('/providers-bookings');
        }
    };

    useEffect(() => {
        if (otpValidated) {
            alert('OTP is verified!');
        }
    }, [otpValidated]);

    useEffect(() => {
        if (bookingStatusUpdated) {
            alert('Booking status updated to complete!');
        }
    }, [bookingStatusUpdated]);

    return (
        <div>
            <h1>Verification Form</h1>
            <input type="file" onChange={handleImage1Change} />
            <input type="file" onChange={handleImage2Change} />
            <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button onClick={handleUploadImages}>Upload Images</button>
            <input
                type="text"
                placeholder="Enter OTP"
                value={otpCode}
                onChange={handleOtpCodeChange}
            />
            <button onClick={handleVerifyOtp}>Verify OTP</button>
            <button onClick={handleSubmit}>Submit</button>
            {verificationError && <p style={{ color: 'red' }}>{verificationError}</p>}
        </div>
    );
};

export default VerificationForm;