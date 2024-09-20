/* const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
        required: true
    },
    consumer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consumer',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    rating: {  // Add rating field (optional)
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    status: {  // Update status field to enum
        type: String,
        enum: ['incomplete', 'ongoing', 'completed'],  // Define the three possible values
        default: 'ongoing'
    },
    feedback: {  // Add feedback field
      type: String,
      trim: true  // Trim whitespace
    },
    timeslot: {  // Add timeslot field
        type: String,
        required: true  // Assuming it's required
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
 */



const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
        required: true
    },
    consumer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consumer',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    status: {
        type: String,
        enum: ['incomplete', 'ongoing', 'completed', 'upcoming'],
        default: 'upcoming'
    },
    feedback: {
        type: String,
        trim: true
    },
    timeslot: {  // Change to array of dates
        type: [Date],  // Array of Date objects
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
