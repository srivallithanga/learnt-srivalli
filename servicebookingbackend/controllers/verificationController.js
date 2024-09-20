const { check, validationResult } = require('express-validator');
const Verification = require('../models/Verification');
const OtpLogin = require('../models/OtpLogin');
const crypto = require('crypto');
const twilio = require('twilio');
const https = require('https');

// Twilio configuration (replace these values with your Twilio credentials)
const accountSid = "AC67f46490dbe7313a611b619dcf559882";
const authToken = "162f71ec2a35811ce8d7d17ec1319da2";
const twilioPhoneNumber = "+12084398222"; // Make sure to use the correct Twilio phone number

const httpsAgent = new https.Agent({
    rejectUnauthorized: false
});

const client = new twilio(accountSid, authToken, { httpAgent: httpsAgent });

// @desc    Create a new verification record with two images and send OTP via SMS
// @route   POST /api/verify
// @access  Public
exports.createVerification = [
    check('phoneNumber')
        .matches(/^\+[1-9]\d{1,14}$/).withMessage('Invalid phone number format. Expected format: +918179613579')
        .trim()
        .escape(),
    check('image1')
        .custom((value, { req }) => {
            return req.files.image1 || typeof value === 'string';
        }).withMessage('Image1 is required either as a file or a text path'),
    check('image2')
        .custom((value, { req }) => {
            return req.files.image2 || typeof value === 'string';
        }).withMessage('Image2 is required either as a file or a text path'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { phoneNumber } = req.body;
            const { bookingId } = req.body;

            // Check if image1 and image2 are provided as files or paths
            const image1 = req.files?.image1 ? req.files.image1[0].path : req.body.image1;
            const image2 = req.files?.image2 ? req.files.image2[0].path : req.body.image2;

            const bookingLink = `http://localhost:3001/booking/${bookingId}`;

            // Generate OTP and send SMS
            const otp = crypto.randomInt(100000, 999999).toString();
            await client.messages.create({
                body: `Your OTP code is ${otp}. You can view your booking details here: ${bookingLink}`,
                from: twilioPhoneNumber,
                to: phoneNumber,
            });

            // Store OTP in the database
            const expiresAt = new Date();
            expiresAt.setMinutes(expiresAt.getMinutes() + 5);

            await OtpLogin.create({
                phoneNumber,
                otpCode: otp,
                isUsed: false,
                expiresAt,
            });

            // Create verification entry
            const verification = new Verification({
                image1, // Use the path or file as image1
                image2, // Use the path or file as image2
            });

            await verification.save();

            res.json({
                msg: 'Verification created successfully, OTP sent via SMS',
                verificationId: verification._id,
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: 'Server error', error: err.message });
        }
    }
];

// @desc    Validate OTP and complete the verification process
// @route   POST /api/verify/validate
// @access  Public
exports.validateOtp = [
    check('phoneNumber')
        .matches(/^\+[1-9]\d{1,14}$/).withMessage('Invalid phone number format. Expected format: +918179613579')
        .trim()
        .escape(),
    check('otpCode')
        .isNumeric().withMessage('OTP must be numeric')
        .isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits long')
        .trim()
        .escape(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { phoneNumber, otpCode } = req.body; 

        try {
            // Check if the OTP is valid
            const otpRecord = await OtpLogin.findOne({
                phoneNumber,
                otpCode,
                isUsed: false,
                expiresAt: { $gte: new Date() }, // OTP should not be expired
            });

            if (!otpRecord) {
                return res.status(400).json({ message: 'Invalid OTP or OTP expired' });
            }

            // Mark the OTP as used
            otpRecord.isUsed = true;
            await otpRecord.save();

            res.json({
                msg: 'OTP validated successfully',
            });
        } catch (error) {
            console.error('Error validating OTP:', error);
            res.status(500).json({ message: 'Failed to validate OTP', error });
        }
    }
];