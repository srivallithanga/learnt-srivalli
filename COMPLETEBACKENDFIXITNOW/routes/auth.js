const express = require('express');
const router = express.Router();
const { register, login,getProviders,getAllProviders, updateConsumer, getConsumerById, getProviderById, updateProvider} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/providers', getProviders);
router.get('/providers/all', getAllProviders);
router.get('/provider/:id', getProviderById);
router.put('/provider/:id', updateProvider);
router.put('/consumer/:id', updateConsumer);
router.get('/consumer/:id', getConsumerById);
module.exports = router;
