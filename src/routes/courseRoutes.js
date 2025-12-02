const express = require('express');
const Course = require('../models/Course.model');

const router = express.Router();

    // get all courses
    router.get("/", async(req, res)=>{
        const courses = await Course.find();
       return res.json(courses)
    })

    // post course
    router.post("/", async(req, res)=>{
        const course = new Course(req.body)
        // todo: existing course

        await course.save()
        return res.status(201).json({success: true, data: course})
    })



module.exports = router
