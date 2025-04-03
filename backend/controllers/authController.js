const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const otpGen = require('otp-generator');
const { uploadImage } = require('../config/uploadImage'); // Import Image Upload Function

// 🔹 Token Generation Function
const tokenGeneration = (userId, email, role) => {
  return jwt.sign({ userId, email, role }, process.env.SECRET_KEY, { expiresIn: '7d' });
};

// 🔹 Register User with Image Upload
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    // const image = req.files?.photo;

    if (!username || !email || !password ) {
      return res.status(400).json({ message: "All fields including an image are required" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email is already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const userRole = role || 'user'; // Default role is 'user'
    const token = tokenGeneration(email, userRole);
    const user = new User({ username, email, password: hashedPassword, token, role: userRole });
    await user.save();
    // const imageName = await uploadImage(user._id, image, 'users');
    // user.photo = imageName;
    await user.save();
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Error registering user" });
  }
};

// 🔹 Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = tokenGeneration(user._id, user.email, user.role);

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, username: user.username, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 🔹 Forgot Password - Send OTP & Reset Link
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = tokenGeneration(user._id, user.email, user.role);
    const otp = otpGen.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });

    user.otp = otp;
    user.token = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour expiry
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: { user: process.env.EMAIL, pass: process.env.PASSWORD },
    });

    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
    await transporter.sendMail({
      to: user.email,
      subject: 'Password Reset Request',
      text: `Click the link below to reset your password:
      ${resetLink} 
      OTP for verification: ${otp}`,
    });

    res.status(200).json({ message: 'Reset link and OTP sent to your email' });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// 🔹 Reset Password with OTP Verification
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const user = await User.findOne({ email, otp, resetTokenExpiry: { $gt: Date.now() } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid OTP or expired token' });
    }

    user.password = await bcrypt.hash(newPassword, 8);
    user.otp = null;
    user.resetTokenExpiry = null;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// 🔹 Get All Users (Admin Only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password -otp -resetTokenExpiry'); // Exclude sensitive fields
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// 🔹 Get Single User
const getSingleUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId, '-password -otp -resetTokenExpiry'); // Exclude sensitive fields

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { registerUser, loginUser, forgotPassword, resetPassword, getAllUsers, getSingleUser };
