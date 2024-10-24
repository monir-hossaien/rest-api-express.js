
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name must be required'],
        trim: true,
    },
    image:{
        type: String,
        required: [true, 'image must be required'],
        unique: [true, 'image must be unique'],
        limits: {
            fileSize: 2 * 1024 * 1024 // 2MB in bytes
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email address'
        ]
    },
    phone:{
        type: String,
        required: [true, 'Phone number is required'],
        unique: true,
        trim: true,
        match: [
            /^(?:\+88|88)?(01[3-9]\d{8})$/,
            'Please enter a valid phone number'
        ]
    },
    department: {
        type: String,
        trim: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User
