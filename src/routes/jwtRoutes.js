const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router()


// jwt api
router.post('/jwt', async (req, res) => {
    const user = req.body;

    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d'
    })
    return res.json({ token })
})

module.exports = router