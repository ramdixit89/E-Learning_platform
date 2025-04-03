const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    },
    token: {
        type: String,
        required: true
    },
    otp: {
        type: Number,
    },
    resetTokenExpiry: { 
        type: Date 
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user' // Default role is 'user'
    }
});

const User = mongoose.model('users', userSchema);
module.exports = User;
