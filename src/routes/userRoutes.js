const express = require('express');
const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const sendEmail = require('../utils/email');
const router = express.Router()



// post user
router.post('/', async (req, res) => {
    const user = new User(req.body);
    const password = user?.password;
    const soltRound = 10;
    const hashedPass = await bcrypt.hash(password, soltRound)
    user.password = hashedPass
    const filter = { email: user?.email }
    const existingUser = await User.findOne(filter);
    if (existingUser) {
        return res.json({ insertedId: null, message: "user already have an account, please login!" })
    }
    await user.save();
    await sendEmail({
        to: user.email,
        subject: '🎉 Welcome to Shikhoo!',
        html: `
        <h2>Hello ${user?.name || "User"},</h2>
        <p>Welcome to <strong>Shikhoo</strong>! 🎓</p>
        <p>Your account has been created successfully.</p>
        <br/>
        <p>Best regards,<br/>Team Shikhoo</p>
      `
    });
    return res.status(201).json({ success: true, data: user })
})

// get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    return res.json(users)
})

// get single user
router.get('/:email', async (req, res) => {
    const email = req.params.email;
    const filter = { email: email };
    const user = await User.findOne(filter);
    res.json(user)
})

// is admin
router.get('/admin/:email', async (req, res) => {
    const email = req.params.email;
    if (!email === req.decoded?.email) {
        return res.status(403).json({ message: "Unauthorized access" })
    }
    const filter = { email: email };
    const user = await User.findOne(filter);
    let isAdmin = false;
    if (user) {
        isAdmin = user?.role == 'admin'
    }
    res.json(isAdmin)
})



module.exports = router