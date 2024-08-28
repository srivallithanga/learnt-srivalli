var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ProfessionEnum = ['IT', 'Sales', 'Unemployed'];

const CarrentalSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  profession: {
    type: String,
    enum: ProfessionEnum,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Carrental', CarrentalSchema);