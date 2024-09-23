const express = require('express');
const router = express.Router();
const { createVerification,validateOtp } = require('../controllers/verificationController');
const upload = require('../middlewares/multer');

router.post('/', upload, createVerification);
router.post('/validate', upload, validateOtp);

module.exports = router;
