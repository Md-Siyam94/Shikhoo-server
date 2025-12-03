const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5700

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
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

// jwt api
app.post('/jwt', async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1d'
  })
  return res.json({ token })
})

// verify token
const verifyToken = (req, res, next) => {
  if(!req.headers.authorization){
    return res.status(401).json({message: "Forbidden access"})
  }
  const token = req.headers.authorization.split(' ')[1]
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err, decoded)=>{
    if(err){
      return res.status(401).json({message: "Forbidden access"})
    }
    req.decoded = decoded
    next()
  })
  
}


app.use('/users',verifyToken, userRoutes)
app.use('/courses',verifyToken, courseRoutes)


app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
})