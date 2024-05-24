const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const {connectDB}=require('./config/db')
const {errorHandler} = require('../backend/middleware/errorMiddleware')
const port = process.env.PORT||5000

connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/goals',require('./routes/goalRoutes'))
app.use('/api/users',require('./routes/userRoutes'))
app.use(errorHandler) //overwritting default error handler.



app.listen(port, () => {
    console.log(`Server started on ${port}`);
})

