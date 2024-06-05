const mongoose = require("mongoose");
const dotenv = require('dotenv').config()

const connectDB = async ()=>
{
try{
    
    //  console.log(process.env.MONGO_URL)
    
    const conn= await mongoose.connect(process.env.MONGO_URL)
    console.log(`Mongo DB connected : ${conn.connection.host}`.yellow.underline);
}
catch(err)
{
console.log(err);
process.exit(1)
}
}

module.exports={connectDB}