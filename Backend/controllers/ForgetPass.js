import nodemailer from 'nodemailer';
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';


export let otpStore = {};

// Sending OTP
const sendotp = async (req, res) => {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.json({ success: false, message: "User doesn't exist" });
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Use environment variables
            pass: process.env.EMAIL_PASS, // Use environment variables
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER, // Use your environment variable email
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h2>Your OTP Code</h2>
            <p>Your OTP code is: <strong>${otp}</strong></p>
            <p>Use this code to reset your password.</p>
            <p style="color: red;">Do not share this code with anyone.</p>
            <p>Thank you,<br/>TechNest Team</p>
            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        otpStore[email] = otp;
        res.json({ success: true, message: 'OTP sent' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.json({ success: false, message: 'Failed to send OTP' });
    }
};

// Verifying OTP
const verifyotp = (req, res) => {
    const { email, otp } = req.body;
    if (otpStore[email] && otpStore[email] === otp) {
        delete otpStore[email];
        res.json({ success: true, message: 'OTP verified' });
    } else {
        res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
};

// Creating JWT token
// const createToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET);
// };

// Resetting password
const resetpass = async (req, res) => {
    const { email, newpassword } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }

        // Encoding new password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newpassword, salt);

        // Update user's password in the database
        await userModel.findOneAndUpdate(
            { email },
            { password: hashedPassword },
            { new: true }
        );

        // const token = createToken(user._id);
        console.log(`Password for ${email} has been reset.`);
        res.json({ success: true, message: "updated" });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.json({ success: false, message: 'Error resetting password' });
    }
};

export { sendotp, resetpass, verifyotp };
