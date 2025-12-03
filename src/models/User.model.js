const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    photoURL: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'student',
        enum: ['student', 'admin']
    },
},
    { timestamps: true }
)

const User = mongoose.model("Users", userSchema);
module.exports = User;