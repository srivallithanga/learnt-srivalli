const crypto = require('crypto');
const twilio = require('twilio');
const jwt = require('jsonwebtoken'); // JWT for token generation
const OtpLogin = require('../models/OtpLogin'); // Mongoose Model for OTP Login
const User = require('../models/User'); // Mongoose Model for User
const { twilio: twilioConfig, jwtSecret } = require('../config'); // Config for Twilio and JWT
const client = twilio(twilioConfig.accountSid, twilioConfig.authToken);

// Generate and send OTP using Twilio
async function generateAndCreateOtp(req, res) {
    const { phoneNumber } = req.body;
    try {
        // Mark all unused OTPs for the given phone number as used
        await OtpLogin.updateMany(
            {
                phoneNumber,
                isUsed: false,
                expiresAt: { $gte: new Date() },
            },
            { isUsed: true }
        );

        // Generate a 6-digit OTP
        const otpCode = crypto.randomInt(100000, 999999).toString();
        console.log(`Generated OTP: ${otpCode}`);

        // Set expiration time (5 minutes)
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 5);

        // Store OTP in the database
        const otpRecord = await OtpLogin.create({
            phoneNumber,
            otpCode,
            isUsed: false,
            expiresAt,
        });

        // Send OTP via Twilio
        const message = await client.messages.create({
            body: `Your OTP is ${otpCode}. It is valid for 5 minutes.`,
            from: twilioConfig.phoneNumber,
            to: phoneNumber,
        });

        console.log(`Message SID: ${message.sid}`);
        res.json(otpRecord);
    } catch (error) {
        console.error('Error generating or sending OTP:', error);
        res.status(500).json({ message: 'Error generating or sending OTP' });
    }
}

// Validate OTP and create or return existing user
async function validateOtp(req, res) {
    const { phoneNumber, otpCode } = req.body;
    try {
        // Find OTP record that matches phone number and OTP code
        const otpRecord = await OtpLogin.findOne({
            phoneNumber,
            otpCode,
            isUsed: false,
            expiresAt: { $gte: new Date() },
        });

        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid OTP or OTP expired' });
        }

        // Mark OTP as used
        otpRecord.isUsed = true;
        await otpRecord.save();

        const username = phoneNumber;
        const email = `${phoneNumber.slice(1)}@gmail.com`;

        // Find or create the user
        let existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (!existingUser) {
            existingUser = await User.create({
                username,
                email,
                password: phoneNumber, // Note: Ensure to hash the password in production!
                role: 'user', // Define your role IDs or use a role management strategy
            });
        }

        // Generate JWT token
        const jwtToken = jwt.sign({ id: existingUser._id }, jwtSecret, { expiresIn: '1h' });

        // Return response with JWT token and user details
        res.json({
            isValid: true,
            message: 'OTP validated successfully, user created or exists',
            user: {
                id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
            },
        });
    } catch (error) {
        console.error('Error validating OTP:', error);
        res.status(500).json({ message: 'Failed to validate OTP', error });
    }
}

module.exports = {
    generateAndCreateOtp,
    validateOtp,
};