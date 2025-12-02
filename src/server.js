const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5700

app.use(express.json())
app.use(cors())

app.get('/', (req, res)=>{
    res.json("This is ShIKHOO server ")
})

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_KEY}@cluster0.ttcu5.mongodb.net/shikhooDB?retryWrites=true&w=majority`)
  .then(res => {
    console.log("MongoDB connected (Atlas)");
  })
  .catch(err => {
    console.log("error from db", err);
  })

//   routes
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');



app.use('/users', userRoutes)
app.use('/courses', courseRoutes)


app.listen(port, ()=>{
    console.log(`server is running on port: ${port}`);
})