const express = require('express');
const EnrollCourse = require('../models/EnrollCourse.model');


const router = express.Router();

// post enrolled course
router.post("/", async (req, res) => {
    const enrolledCourse = new EnrollCourse(req.body)
    const existingEnrolled = await EnrollCourse.findOne({
        email: enrolledCourse?.email,
        courseId: enrolledCourse?.courseId
    })
    if (existingEnrolled) {
        return res.json({ message: "You have been already enrolled" })
    }
    await enrolledCourse.save()
    return res.json({ success: true, data: enrolledCourse })
})

// get all enrolled courses
router.get("/", async (req, res) => {
    const enrolledCourses = await EnrollCourse.find();
    return res.json(enrolledCourses)
})

// get enrolled coures by user
router.get('/:email', async(req, res)=>{
    const email = req.params.email;
    const query = {email: email}
    const enrolledCourse = await EnrollCourse.find(query);
    return res.json(enrolledCourse)

})

module.exports = router