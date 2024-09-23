// ServiceDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RateService from './RateService'; // Import the RateService component

const ServiceDetailsPage = ({ serviceId }) => {
  const [service, setService] = useState(null);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [bookingId, setBookingId] = useState(null); // Assume you get this from the service or bookings

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/service/${serviceId}`);
        setService(response.data);
        // Set bookingId if needed
      } catch (error) {
        console.error('Error fetching service:', error);
      }
    };

    fetchService();
  }, [serviceId]);

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Service Details</h1>
      <p><strong>Name:</strong> {service.name}</p>
      <p><strong>Description:</strong> {service.description}</p>
      <p><strong>Average Rating:</strong> {service.averageRating || 'Not rated yet'}</p>

      <button onClick={() => setShowRatingForm(true)}>Rate This Service</button>
      {showRatingForm && (
        <RateService bookingId={bookingId} onClose={() => setShowRatingForm(false)} />
      )}
    </div>
  );
};

export default ServiceDetailsPage;
