// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const Consumer = require('../models/Consumer');
// const Provider = require('../models/Provider');
// const User = require('../models/User');


// // JWT Secret
// const jwtSecret = 'your_jwt_secret';

// // @desc    Register consumer or provider
// // @route   POST /api/auth/register
// // @access  Public
// exports.register = async (req, res) => {
//   const { username, password, mobile, role, services } = req.body;

//   try {
//       // Check if user already exists
//       let user = await User.findOne({ username });
//       if (user) {
//           return res.status(400).json({ msg: 'User already exists' });
//       }

//       // Validation for consumer role: services should not be provided
//       if (role === 'consumer' && services) {
//           return res.status(400).json({ msg: 'Services are not allowed for consumer role' });
//       }

//       // Validation for provider role: services are mandatory
//       if (role === 'provider') {
//           if (!services || services.length === 0) {
//               return res.status(400).json({ msg: 'At least one service is required for provider role' });
//           }

//           // Validate that each service has a price
//           for (let i = 0; i < services.length; i++) {
//               if (!services[i].service || !services[i].price) {
//                   return res.status(400).json({ msg: `Service and price are required for every service entry (missing at index ${i})` });
//               }
//           }
//       }

//       // Create user object
//       let newUser;
//       if (role === 'consumer') {
//           newUser = new Consumer({ username, password, mobile });
//       } else if (role === 'provider') {
//           newUser = new Provider({
//               username,
//               password,
//               mobile,
//               services // This will store the array of service IDs and prices
//           });
//       } else {
//           return res.status(400).json({ msg: 'Invalid role' });
//       }

//       // Hash the password
//       const salt = await bcrypt.genSalt(10);
//       newUser.password = await bcrypt.hash(password, salt);

//       // Save user in both User collection and specific role-based collection
//       const savedUser = new User({ username, password: newUser.password });
//       await savedUser.save();
//       await newUser.save();

//       // Return JWT
//       const payload = {
//           user: { id: newUser.id, role: role },
//       };
//       jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
//           if (err) throw err;
//           res.json({ token });
//       });
//   } catch (err) {
//       res.status(500).json({ msg: 'Server error' });
//   }
// };


// // @desc    Login user
// // @route   POST /api/auth/login
// // @access  Public
// exports.login = async (req, res) => {
//     const { username, password } = req.body;
    
//     try {
//         // Check if user exists
//         let user = await User.findOne({ username });
//         if (!user) {
//             return res.status(400).json({ msg: 'Invalid credentials' });
//         }

//         // Check password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ msg: 'Invalid credentials' });
//         }

//         // Identify if the user is a Consumer or Provider
//         let roleUser = await Consumer.findOne({ username });
//         if (!roleUser) {
//             roleUser = await Provider.findOne({ username });
//         }

//         // If user is not found in both collections, send an error
//         if (!roleUser) {
//             return res.status(400).json({ msg: 'User not found in specific role' });
//         }

//         const role = roleUser.role;

//         // Prepare the payload for the JWT
//         const payload = {
//             user: {
//                 id: user.id,
//                 role
//             },
//         };

//         // Sign and return the JWT, along with the user's full details
//         jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' }, (err, token) => {
//             if (err) throw err;

//             // Return full details of the logged-in user along with the token
//             res.json({
//                 token,
//                 userDetails: roleUser
//             });
//         });

//     } catch (err) {
//         res.status(500).json({ msg: 'Server error' });
//     }
// };

// exports.getProviders = async (req, res) => {
//   const { serviceId } = req.query;

//   try {
//       // Modify query to use $elemMatch to find the service ID inside the services array
//       const providers = await Provider.find({
//           services: { $elemMatch: { service: serviceId } }
//       }).populate('services.service'); // Assuming 'services.service' is a reference to another collection
//       res.json(providers);
//   } catch (err) {
//       console.error(err);
//       res.status(500).json({ msg: 'Server error' });
//   }
// };


// exports.getAllProviders = async (req, res) => {
//   try {
//       // Fetch all providers
//       const providers = await Provider.find().populate('services');
//       res.json(providers);
//   } catch (err) {
//       res.status(500).json({ msg: 'Server error' });
//   }
// };

// exports.getProviderById = async (req, res) => {
//   const { id } = req.params;

//   try {
//       // Find the provider by ID
//       const provider = await Provider.findById(id).populate('services.service'); // Assuming services.service references another collection
//       if (!provider) {
//           return res.status(404).json({ msg: 'Provider not found' });
//       }

//       // Return the provider's details
//       res.json(provider);
//   } catch (err) {
//       console.error(err);
//       res.status(500).json({ msg: 'Server error' });
//   }
// };


// exports.updateProvider = async (req, res) => {
//   const { id } = req.params;
//   const { username, password, mobile, services } = req.body;

//   try {
//       // Find the provider by ID
//       let provider = await Provider.findById(id);
//       if (!provider) {
//           return res.status(404).json({ msg: 'Provider not found' });
//       }

//       // Update fields in Provider
//       if (username) provider.username = username;
//       if (mobile) provider.mobile = mobile;
//       if (services && services.length > 0) {
//           // Validate that each service has a price
//           for (let i = 0; i < services.length; i++) {
//               if (!services[i].service || !services[i].price) {
//                   return res.status(400).json({ msg: `Service and price are required for every service entry (missing at index ${i})` });
//               }
//           }
//           provider.services = services;
//       }

//       // If password is provided, hash it
//       if (password) {
//           const salt = await bcrypt.genSalt(10);
//           provider.password = await bcrypt.hash(password, salt);
//       }

//       // Save updated provider
//       await provider.save();

//       // Update the corresponding user in the User collection
//       let user = await User.findOne({ username: provider.username });
//       if (user) {
//           if (username) user.username = username; // Update username
//           if (password) user.password = provider.password; // Update password if changed
//           await user.save();
//       } else {
//           // If the user does not exist, create a new User record
//           user = new User({ username: provider.username, password: provider.password });
//           await user.save();
//       }

//       res.json({ msg: 'Provider details updated', provider });
//   } catch (err) {
//       console.error(err);
//       res.status(500).json({ msg: 'Server error' });
//   }
// };

// // @desc    Update consumer details
// // @route   PUT /api/auth/consumer/:id
// // @access  Private
// exports.updateConsumer = async (req, res) => {
//   const { id } = req.params;
//   const { username, password, mobile, address } = req.body;

//   try {
//       // Find the consumer by ID
//       let consumer = await Consumer.findById(id);
//       if (!consumer) {
//           return res.status(404).json({ msg: 'Consumer not found' });
//       }

//       // Update fields in Consumer
//       if (username) consumer.username = username;
//       if (mobile) consumer.mobile = mobile;
//       if (address !== undefined) consumer.address = address; // Update address if provided

//       // If password is provided, hash it
//       if (password) {
//           const salt = await bcrypt.genSalt(10);
//           consumer.password = await bcrypt.hash(password, salt);
//       }

//       // Save updated consumer
//       await consumer.save();

//       // Update the corresponding user in the User collection
//       let user = await User.findOne({ username: consumer.username });
//       if (user) {
//           if (username) user.username = username; // Update username
//           if (password) user.password = consumer.password; // Update password if changed
//           await user.save();
//       } else {
//           // If the user does not exist, create a new User record
//           user = new User({ username: consumer.username, password: consumer.password });
//           await user.save();
//       }

//       res.json({ msg: 'Consumer details updated', consumer });
//   } catch (err) {
//       res.status(500).json({ msg: 'Server error' });
//   }
// };


// exports.getConsumerById = async (req, res) => {
//   const { id } = req.params;

//   try {
//       // Find the consumer by ID
//       const consumer = await Consumer.findById(id);
//       if (!consumer) {
//           return res.status(404).json({ msg: 'Consumer not found' });
//       }

//       // Return the consumer's details
//       res.json(consumer);
//   } catch (err) {
//       console.error(err);
//       res.status(500).json({ msg: 'Server error' });
//   }
// };

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult, body } = require('express-validator');
const Consumer = require('../models/Consumer');
const Provider = require('../models/Provider');
const User = require('../models/User');

// JWT Secret
const jwtSecret = 'your_jwt_secret';

// Validation middleware
const validateRegistration = [
    body('username', 'Username is required').not().isEmpty(),
    body('password', 'Password is required and must be at least 6 characters').isLength({ min: 6 }),
    body('mobile', 'Valid mobile number is required').isMobilePhone(),
    body('role', 'Role must be either consumer or provider').isIn(['consumer', 'provider']),
];

// @desc    Register consumer or provider
// @route   POST /api/auth/register
// @access  Public
exports.register = [
    validateRegistration,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

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
                newUser = new Provider({ username, password, mobile, services });
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
                user: { id: newUser.id, role },
            };
            jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
        } catch (err) {
            res.status(500).json({ msg: 'Server error' });
        }
    }
];

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = [
    body('username', 'Username is required').not().isEmpty(),
    body('password', 'Password is required').exists(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        try {
            let user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({ msg: 'Invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid credentials' });
            }

            let roleUser = await Consumer.findOne({ username });
            if (!roleUser) {
                roleUser = await Provider.findOne({ username });
            }

            if (!roleUser) {
                return res.status(400).json({ msg: 'User not found in specific role' });
            }

            const role = roleUser.role;

            const payload = {
                user: { id: user.id, role },
            };

            jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
                if (err) throw err;
                res.json({ token, userDetails: roleUser });
            });

        } catch (err) {
            res.status(500).json({ msg: 'Server error' });
        }
    }
];

// @desc    Get all providers offering a specific service
// @route   GET /api/auth/providers
// @access  Public
exports.getProviders = async (req, res) => {
    const { serviceId } = req.query;

    if (!serviceId) {
        return res.status(400).json({ msg: 'Service ID is required' });
    }

    try {
        const providers = await Provider.find({
            services: { $elemMatch: { service: serviceId } }
        }).populate('services.service');
        res.json(providers);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// @desc    Get all providers
// @route   GET /api/auth/all-providers
// @access  Public
exports.getAllProviders = async (req, res) => {
    try {
        const providers = await Provider.find().populate('services');
        res.json(providers);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// @desc    Get provider by ID
// @route   GET /api/auth/provider/:id
// @access  Public
exports.getProviderById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ msg: 'Provider ID is required' });
    }

    try {
        const provider = await Provider.findById(id).populate('services.service');
        if (!provider) {
            return res.status(404).json({ msg: 'Provider not found' });
        }

        res.json(provider);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// @desc    Update provider details
// @route   PUT /api/auth/provider/:id
// @access  Private
exports.updateProvider = [
    body('username').optional().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    body('mobile').optional().isMobilePhone(),
    body('services').optional().isArray().withMessage('Services should be an array'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const { username, password, mobile, services } = req.body;

        try {
            let provider = await Provider.findById(id);
            if (!provider) {
                return res.status(404).json({ msg: 'Provider not found' });
            }

            if (username) provider.username = username;
            if (mobile) provider.mobile = mobile;
            if (services && services.length > 0) {
                for (let i = 0; i < services.length; i++) {
                    if (!services[i].service || !services[i].price) {
                        return res.status(400).json({ msg: `Service and price are required for every service entry (missing at index ${i})` });
                    }
                }
                provider.services = services;
            }

            if (password) {
                const salt = await bcrypt.genSalt(10);
                provider.password = await bcrypt.hash(password, salt);
            }

            await provider.save();

            let user = await User.findOne({ username: provider.username });
            if (user) {
                if (username) user.username = username;
                if (password) user.password = provider.password;
                await user.save();
            } else {
                user = new User({ username: provider.username, password: provider.password });
                await user.save();
            }

            res.json({ msg: 'Provider details updated', provider });
        } catch (err) {
            res.status(500).json({ msg: 'Server error' });
        }
    }
];

// @desc    Update consumer details
// @route   PUT /api/auth/consumer/:id
// @access  Private
exports.updateConsumer = [
    body('username').optional().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    body('mobile').optional().isMobilePhone(),
    body('address').optional().isString(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const { username, password, mobile, address } = req.body;

        try {
            let consumer = await Consumer.findById(id);
            if (!consumer) {
                return res.status(404).json({ msg: 'Consumer not found' });
            }

            if (username) consumer.username = username;
            if (mobile) consumer.mobile = mobile;
            if (address) consumer.address = address;

            if (password) {
                const salt = await bcrypt.genSalt(10);
                consumer.password = await bcrypt.hash(password, salt);
            }

            await consumer.save();

            let user = await User.findOne({ username: consumer.username });
            if (user) {
                if (username) user.username = username;
                if (password) user.password = consumer.password;
                await user.save();
            } else {
                user = new User({ username: consumer.username, password: consumer.password });
                await user.save();
            }

            res.json({ msg: 'Consumer details updated', consumer });
        } catch (err) {
            res.status(500).json({ msg: 'Server error' });
        }
    }
];

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