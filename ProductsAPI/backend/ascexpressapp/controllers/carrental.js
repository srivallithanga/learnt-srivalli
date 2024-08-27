const Carrental = require('../models/carrental');
const bcrypt = require('bcrypt');
const { body, validationResult, param } = require('express-validator');
const saltRounds = 10;


const validateUser = [
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('age').isInt({ min: 0 }).withMessage('Age must be a positive integer'),
    body('gender').isIn(['male', 'female']).withMessage('Gender must be male, or female'),
    body('dob').isDate().withMessage('Date of birth must be a valid date'),
    body('city').isLength({ min: 1 }).withMessage('City is required'),
    body('profession').isLength({ min: 1 }).withMessage('Profession is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ];
  
  const validateUserUpdate = [
    body('username').optional().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email').optional().isEmail().withMessage('Invalid email address'),
    body('age').optional().isInt({ min: 0 }).withMessage('Age must be a positive integer'),
    body('gender').optional().isIn(['male', 'female', 'other']).withMessage('Gender must be male, female, or other'),
    body('dob').optional().isDate().withMessage('Date of birth must be a valid date'),
    body('city').optional().isLength({ min: 1 }).withMessage('City is required'),
    body('profession').optional().isLength({ min: 1 }).withMessage('Profession is required'),
    body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ];
  
  const validateId = [
    param('id').isMongoId().withMessage('Invalid user ID format')
  ];
  
  const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };


exports.index = async function(req, res) {
    try {
      const users = await Carrental.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.getCarrental = validateId, handleValidationErrors, async function(req, res) {
    try {
      const user = await Carrental.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.createCarrental = validateUser, handleValidationErrors, async function(req, res) {
    try {
      const { username, email, age, gender, dob, city, profession, password } = req.body;
  
      let existingUser = await Carrental.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      const newUser = new Carrental({
        username,
        email,
        age,
        gender,
        dob,
        city,
        profession,
        password: hashedPassword
      });
  
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.putCarrental = validateId, validateUserUpdate, handleValidationErrors, async function(req, res) {
    try {
      const { username, email, age, gender, dob, city, profession, password } = req.body;
  
      const hashedPassword = password ? await bcrypt.hash(password, saltRounds) : undefined;
  
      const updatedUser = await Carrental.findByIdAndUpdate(req.params.id, {
        username,
        email,
        age,
        gender,
        dob,
        city,
        profession,
        password: hashedPassword
      }, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.patchCarrental = validateId, validateUserUpdate, handleValidationErrors, async function(req, res) {
    try {
      const { username, email, age, gender, dob, city, profession, password } = req.body;
  
      const updates = {};
      if (username) updates.username = username;
      if (email) updates.email = email;
      if (age) updates.age = age;
      if (gender) updates.gender = gender;
      if (dob) updates.dob = dob;
      if (city) updates.city = city;
      if (profession) updates.profession = profession;
      if (password) updates.password = await bcrypt.hash(password, saltRounds);
  
      const updatedUser = await Carrental.findByIdAndUpdate(req.params.id, updates, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.deleteCarrental = validateId, async function(req, res) {
    try {
      const deletedUser = await Carrental.findByIdAndDelete(req.params.id);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };