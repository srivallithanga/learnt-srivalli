const { body, param, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const Provider = require('../models/Provider');

// Function to calculate and update the average rating of a provider
const updateProviderAverageRating = async (providerId) => {
    try {
        console.log(`Updating rating for provider ${providerId}`);
        const bookings = await Booking.find({ provider: providerId, rating: { $ne: null } });
        console.log(`Bookings found: ${bookings.length}`);

        if (bookings.length === 0) {
            await Provider.findByIdAndUpdate(providerId, { averageRating: 0 });
            console.log(`No ratings found. Set averageRating to 0.`);
            return;
        }

        const totalRating = bookings.reduce((sum, booking) => sum + booking.rating, 0);
        const averageRating = totalRating / bookings.length;
        console.log(`Calculated averageRating for provider: ${averageRating}`);

        await Provider.findByIdAndUpdate(providerId, { averageRating });
        console.log(`Provider ${providerId} updated with averageRating ${averageRating}`);
    } catch (err) {
        console.error("Error updating provider rating:", err);
    }
};

// Middleware to validate and sanitize booking creation (POST method)
/*exports.validateCreateBooking = [
    body('consumer').notEmpty().withMessage('Consumer ID is required').isMongoId().withMessage('Invalid Consumer ID').trim(),
    body('provider').notEmpty().withMessage('Provider ID is required').isMongoId().withMessage('Invalid Provider ID').trim(),
    body('service').notEmpty().withMessage('Service ID is required').isMongoId().withMessage('Invalid Service ID').trim(),
    body('date').optional().isISO8601().withMessage('Invalid Date format').toDate(),
    body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5'),
    body('feedback').optional().trim().escape()
];

// Create a new booking (POST)
// Create a new booking (POST)
exports.createBooking = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  try {
      // Include timeslot in the booking creation
      const bookingData = {
          ...req.body,
          timeslot: req.body.timeslot // Add timeslot directly from the request body
      };

      const booking = new Booking(bookingData);
      await booking.save();

      await updateProviderAverageRating(booking.provider);

      res.status(201).json(booking);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};


// Middleware to validate and sanitize booking update (PUT method)
exports.validateUpdateBooking = [
    param('bookingId').isMongoId().withMessage('Invalid Booking ID').trim(),
    body('status').optional().isIn(['incomplete', 'ongoing', 'completed']).withMessage('Invalid status value'),  // Adjusted for enum status
    body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5'),
    body('timeslot').optional().isString().withMessage('Timeslot must be a string').trim(),
    body('feedback').optional().trim().escape()
];

// Update a booking (PUT)
// Update a booking
exports.updateBooking = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  try {
      const booking = await Booking.findById(req.params.bookingId);
      if (!booking) {
          return res.status(404).json({ error: 'Booking not found' });
      }

      // Update only the provided fields (status, rating, feedback, timeslot)
      if (req.body.status !== undefined) {
          booking.status = req.body.status;
      }
      if (req.body.rating !== undefined) {
          booking.rating = req.body.rating;
      }
      if (req.body.feedback !== undefined) {
          booking.feedback = req.body.feedback;
      }
      if (req.body.timeslot !== undefined) {
          booking.timeslot = req.body.timeslot; // Assuming 'timeslot' is a field in the Booking model
      }

      // Save the updated booking
      await booking.save();

      // Update provider's average rating if the rating was modified
      if (req.body.rating !== undefined) {
          await updateProviderAverageRating(booking.provider);
      }

      res.status(200).json(booking);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};
 */


exports.createBooking = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  try {
      // Include timeslot as an array of two Date objects
      const bookingData = {
          ...req.body,
          timeslot: req.body.timeslot  // Expecting an array of two dates
      };

      const booking = new Booking(bookingData);
      await booking.save();

      await updateProviderAverageRating(booking.provider);

      res.status(201).json(booking);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

// Update a booking (PUT)
exports.updateBooking = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  try {
      const booking = await Booking.findById(req.params.bookingId);
      if (!booking) {
          return res.status(404).json({ error: 'Booking not found' });
      }

      // Update only the provided fields (status, rating, feedback, timeslot)
      if (req.body.status !== undefined) {
          booking.status = req.body.status;
      }
      if (req.body.rating !== undefined) {
          booking.rating = req.body.rating;
      }
      if (req.body.feedback !== undefined) {
          booking.feedback = req.body.feedback;
      }
      if (req.body.timeslot !== undefined) {
          booking.timeslot = req.body.timeslot; // Expecting an array of two dates
      }
      console.log(booking.status)

      // Save the updated booking
      await booking.save();

      // Update provider's average rating if the rating was modified
      if (req.body.rating !== undefined) {
          await updateProviderAverageRating(booking.provider);
      }

      res.status(200).json(booking);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};
// Middleware to validate and sanitize booking creation (POST method)
exports.validateCreateBooking = [
  body('consumer').notEmpty().withMessage('Consumer ID is required').isMongoId().withMessage('Invalid Consumer ID').trim(),
  body('provider').notEmpty().withMessage('Provider ID is required').isMongoId().withMessage('Invalid Provider ID').trim(),
  body('service').notEmpty().withMessage('Service ID is required').isMongoId().withMessage('Invalid Service ID').trim(),
  body('date').optional().isISO8601().withMessage('Invalid Date format').toDate(),
  body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5'),
  body('feedback').optional().trim().escape(),
  body('timeslot')
      .isArray({ min: 2, max: 2 }).withMessage('Timeslot must be an array with two date values')
      .custom((value) => {
          if (!value.every(date => !isNaN(new Date(date)))) {
              throw new Error('Each timeslot value must be a valid date.');
          }
          return true;
      })
];

// Middleware to validate and sanitize booking update (PUT method)
exports.validateUpdateBooking = [
  param('bookingId').isMongoId().withMessage('Invalid Booking ID').trim(),
  body('status').optional().isIn(['incomplete', 'ongoing', 'completed','upcoming']).withMessage('Invalid status value'),
  body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5'),
  body('timeslot')
      .optional()
      .isArray({ min: 2, max: 2 }).withMessage('Timeslot must be an array with two date values')
      .custom((value) => {
          if (!value.every(date => !isNaN(new Date(date)))) {
              throw new Error('Each timeslot value must be a valid date.');
          }
          return true;
      }),
  body('feedback').optional().trim().escape()
];



// Get all bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('service')
            .populate('provider')
            .populate('category')
            .populate('consumer');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Middleware to validate and sanitize booking ID param
exports.validateBookingId = [
    param('id').isMongoId().withMessage('Invalid Booking ID').trim()
];

// Get a single booking by ID (GET)
exports.getBookingById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const booking = await Booking.findById(req.params.id)
            .populate('service')
            .populate('provider')
            .populate('category')
            .populate('consumer');
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a booking by ID (DELETE)
exports.deleteBooking = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        await updateProviderAverageRating(booking.provider);

        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get bookings for a specific provider (GET)
exports.getBookingsByProvider = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const bookings = await Booking.find({ provider: req.params.providerId })
            .populate('service')
            .populate('provider')
            .populate('category')
            .populate('consumer');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

