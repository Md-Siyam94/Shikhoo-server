const mongoose = require('mongoose');

const vidoeSchema = new mongoose.Schema({
    videoTitle: {
        type: String,
        required: true,
        trim: true
    },
    videoUrl: {
        type: String,
        required: true,
        trim: true
    }
})

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
   description: {
        type: String,
        required: true,
        trim: true
    },
   instructor: {
        type: String,
        required: true,
      
    },
   syllabus: {
        type: [String],
        required: true,
       
    },
    price: {
        type: Number,
        required: true,
       
    },
    modules: {
        type: [vidoeSchema],
        required: true,
    }

},
{timestamps: true});


const Course = mongoose.model("Course", courseSchema);
module.exports = Course;