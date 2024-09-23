const express = require('express');
const router = express.Router();
const { createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking, getBookingsByProvider, getBookingsByConsumer } = require('../controllers/bookingController');

router.post('/', createBooking);
router.get('/', getAllBookings);
router.get('/:id', getBookingById);
router.put('/:bookingId', updateBooking);
router.delete('/:id', deleteBooking);
router.get('/provider/:providerId', getBookingsByProvider);
router.get('/consumer/:consumerId',  getBookingsByConsumer);
module.exports = router;