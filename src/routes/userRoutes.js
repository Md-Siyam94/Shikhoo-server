const express = require('express');
const User = require('../models/User.model');
const router = express.Router()



  // post user
    router.post('/', async(req, res)=>{
        const user = new User(req.body);
        const filter = {email: user?.email}
        const existingUser = await User.findOne(filter);
        if(existingUser){
            return res.json({message: "user already have an account, please login!"})
        }
        await user.save();
        return res.status(201).json({success: true, data: user})
    })

    // get all users
    router.get('/', async(req,res)=>{
        const users = await User.find();
        return res.json(users)
    })

    // get single user
    router.get('/:email', async(req, res)=>{
        const email = req.params.email;
        const filter = {email: email};
        const user = await User.findOne(filter);
        res.json(user)
    })

  

module.exports = router