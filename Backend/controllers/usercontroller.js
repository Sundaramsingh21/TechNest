import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import nodemailer from 'nodemailer';

//otp sender for signup
export let otpStore = {};
const OTPsender = async (req, res) => {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
        return res.json({ success: false, message: "User exist" });
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
            <p>Use this code to SignUp.</p>
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

//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User Doesn't Exist" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Password" })
        }

        const token = createToken(user._id);
        res.json({ success: true, token })
    } catch (error) {
        res.json({ success: false, message: "Error" })
    }

}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}


//register user
const registerUser = async (req, res) => {
    const { name, password, email,otp } = req.body;
    try {
        //checking is user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "Already exists" })
        }

        //validating email formate & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }
        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword

        })
        if (otpStore[email] && otpStore[email] === otp) {
            delete otpStore[email];
            const user = await newUser.save()
            const token = createToken(user._id)
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: 'Invalid OTP' });
        }
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }

}

export { loginUser, registerUser, OTPsender }
