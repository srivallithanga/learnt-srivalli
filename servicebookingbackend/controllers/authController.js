const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Consumer = require('../models/Consumer');
const Provider = require('../models/Provider');
const User = require('../models/User');


// JWT Secret
const jwtSecret = 'your_jwt_secret';

// @desc    Register consumer or provider
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  const { username, password, mobile, role, services } = req.body;

  try {
      // Check if user already exists
      let user = await User.findOne({ username });
      if (user) {
          return res.status(400).json({ msg: 'User already exists' });
      }

      // Validation for consumer role: services should not be provided
      if (role === 'consumer' && services) {
          return res.status(400).json({ msg: 'Services are not allowed for consumer role' });
      }

      // Validation for provider role: services are mandatory
      if (role === 'provider') {
          if (!services || services.length === 0) {
              return res.status(400).json({ msg: 'At least one service is required for provider role' });
          }

          // Validate that each service has a price
          for (let i = 0; i < services.length; i++) {
              if (!services[i].service || !services[i].price) {
                  return res.status(400).json({ msg: `Service and price are required for every service entry (missing at index ${i})` });
              }
          }
      }

      // Create user object
      let newUser;
      if (role === 'consumer') {
          newUser = new Consumer({ username, password, mobile });
      } else if (role === 'provider') {
          newUser = new Provider({
              username,
              password,
              mobile,
              services // This will store the array of service IDs and prices
          });
      } else {
          return res.status(400).json({ msg: 'Invalid role' });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);

      // Save user in both User collection and specific role-based collection
      const savedUser = new User({ username, password: newUser.password });
      await savedUser.save();
      await newUser.save();

      // Return JWT
      const payload = {
          user: { id: newUser.id, role: role },
      };
      jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
          if (err) throw err;
          res.json({ token });
      });
  } catch (err) {
      res.status(500).json({ msg: 'Server error' });
  }
};


// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Identify if the user is a Consumer or Provider
        let roleUser = await Consumer.findOne({ username });
        if (!roleUser) {
            roleUser = await Provider.findOne({ username });
        }

        // If user is not found in both collections, send an error
        if (!roleUser) {
            return res.status(400).json({ msg: 'User not found in specific role' });
        }

        const role = roleUser.role;

        // Prepare the payload for the JWT
        const payload = {
            user: {
                id: user.id,
                role
            },
        };

        // Sign and return the JWT, along with the user's full details
        jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;

            // Return full details of the logged-in user along with the token
            res.json({
                token,
                userDetails: roleUser
            });
        });

    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};



exports.getProviders = async (req, res) => {
  const { serviceId } = req.query;

  try {
      // Modify query to use $elemMatch to find the service ID inside the services array
      const providers = await Provider.find({
          services: { $elemMatch: { service: serviceId } }
      }).populate('services.service'); // Assuming 'services.service' is a reference to another collection
      res.json(providers);
  } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
  }
};


exports.getAllProviders = async (req, res) => {
  try {
      // Fetch all providers
      const providers = await Provider.find().populate('services');
      res.json(providers);
  } catch (err) {
      res.status(500).json({ msg: 'Server error' });
  }
};

// @desc    Update consumer details
// @route   PUT /api/auth/consumer/:id
// @access  Private
exports.updateConsumer = async (req, res) => {
  const { id } = req.params;
  const { username, password, mobile, address } = req.body;

  try {
      // Find the consumer by ID
      let consumer = await Consumer.findById(id);
      if (!consumer) {
          return res.status(404).json({ msg: 'Consumer not found' });
      }

      // Update fields
      if (username) consumer.username = username;
      if (mobile) consumer.mobile = mobile;
      if (address !== undefined) consumer.address = address; // Update address if provided

      // If password is provided, hash it
      if (password) {
          const salt = await bcrypt.genSalt(10);
          consumer.password = await bcrypt.hash(password, salt);
      }

      // Save updated consumer
      await consumer.save();

      res.json({ msg: 'Consumer details updated', consumer });
  } catch (err) {
      res.status(500).json({ msg: 'Server error' });
  }
};

exports.getConsumerById = async (req, res) => {
  const { id } = req.params;

  try {
      // Find the consumer by ID
      const consumer = await Consumer.findById(id);
      if (!consumer) {
          return res.status(404).json({ msg: 'Consumer not found' });
      }

      // Return the consumer's details
      res.json(consumer);
  } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
  }
};