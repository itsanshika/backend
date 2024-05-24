const jwt= require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User= require("../models/userModel")

const protect = asyncHandler( async(req,res,next) =>
{
 
let token;

//req.headers.authorization has the toke in form of => "Bearer <token>"


if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
{
    try{
        token=req.headers.authorization.split(' ')[1]
//Verify token

const decoded = jwt.verify(token,process.env.JWT_SECRET)

//get user from token by id we passed in as payload but not password

req.user=await User.findById(decoded.id).select('-password')
next()


    }
    catch (err)
    {
        console.log(err)
        res.status(401)

        throw new Error("Authentication failed")
    }

}
if(!token)
{
    res.status(401)
    throw new Error("Authentication failed. No token.")
}


})


module.exports={protect}