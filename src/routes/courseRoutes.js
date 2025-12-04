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

// get all courses
router.get("/search", async (req, res) => {
    const search = req.query?.q;
    const sort = req.query?.sort;
    // console.log(sort);
    let sortOption = {};

    if (sort === "asc") {
        sortOption = { price: 1 };
    } else if (sort === "desc") {
        sortOption = { price: -1 };
    }
    const courses = await Course.find({
        $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { instructor: { $regex: search, $options: "i" } },
        ],
    }).sort(sortOption);
    return res.json(courses);
})

// get single course
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const filter = { _id: id };
    const singleCourse = await Course.findOne(filter);
    return res.json(singleCourse);
})

// update course
router.patch("/update/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: id };
    const updatedData = new Course(req.body);
    const result = await Course.findOneAndUpdate(query, {
        $set: {
            title: updatedData?.title,
            instructor: updatedData?.instructor,
            description: updatedData?.description,
            modules: updatedData?.modules,
            price: updatedData?.price,
            batch: updatedData?.batch,
            syllabus: updatedData?.syllabus,

        },
    }, { new: true }
    )
    return res.json({success: true , data: result})

})

// delete single course
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: id };
    const deleteCourse = await Course.deleteOne(filter);
    return res.json({ success: true, data: deleteCourse });
})


module.exports = router
