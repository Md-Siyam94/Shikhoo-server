const express = require('express');
const Course = require('../models/Course.model');

const router = express.Router();

    // post course
    router.post("/", async (req, res) => {
        const course = new Course(req.body)
        const existingCourse = await Course.findOne({
            title: course?.title,
            description: course?.description
        })
        if (existingCourse) {
            return res.json({ message: "Course already have been puhlished" })
        }
        await course.save()
        return res.status(201).json({ success: true, data: course })
    })

    // get all courses
    router.get("/", async (req, res) => {
        const courses = await Course.find();
        return res.json(courses)
    })

    // get single course
    router.get('/:id', async(req, res)=>{
        const id = req.params.id;
        const filter = {_id: id};
        const singleCourse = await Course.findOne(filter);
        return res.json(singleCourse)
    })





module.exports = router
