const mongoose = require("mongoose");
const dotenv = require('dotenv').config()

const connectDB = async ()=>
{
try{
    // console.log(process.env.MONGO_URL)
    
    const conn= await mongoose.connect(process.env.MONGO_URL)
    // const conn= await mongoose.connect("mongodb+srv://gupta:okay@anshikacluster.zzrazfo.mongodb.net/?retryWrites=true&w=majority&appName=AnshikaCluster")
    console.log(`Mongo DB connected : ${conn.connection.host}`.yellow.underline);
}
catch(err)
{
console.log(err);
process.exit(1)
}
}

module.exports={connectDB}