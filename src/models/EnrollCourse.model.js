const mongoose = require('mongoose');

const enrollSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course', 
      required: true,
    },
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
   batch: {
        type: Number,
        required: true,
      
    },
   thumbnail: {
        type: String,
        required: true,
       
    },
   instructor: {
        type: String,
        required: true,
      
    },
    price: {
        type: Number,
        required: true,
       
    },
},
{timestamps: true}
)
const EnrollCourse = mongoose.model("EnrollCourse", enrollSchema);

module.exports = EnrollCourse