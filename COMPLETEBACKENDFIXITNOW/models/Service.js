const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    // averageRating: {  
    //     type: Number,
    //     min: 0,
    //     max: 5,
    //     default: 0
    // }
});

module.exports = mongoose.model('Service', ServiceSchema);
