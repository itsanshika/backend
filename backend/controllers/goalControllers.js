const asyncHandler = require('express-async-handler')

const Goal = require("../models/goalModel")
const User = require("../models/userModel")
// @desc get Goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler (async (req,res) =>
{

    const goals= await Goal.find({user: req.user.id})
    res.status(200).json({message: goals})
})


// @desc set Goals
// @route POST /api/goals
// @access Private
const setGoals =asyncHandler (async (req,res)=>
{
    // console.log(req.body.text);
    if(req.body.text === undefined)
    {
        // res.status(400)
        throw new Error('text files missing')
    }
    const goal= await Goal.create({
        user: req.user.id,
        text: req.body.text
    })
    res.status(200).json(goal)
})


// @desc Update Goals
// @route PUT /api/goals/:id
// @access Private
const updateGoals = asyncHandler (async (req,res)=>
{
    const goal= await Goal.findById(req.params.id)

    if(!goal || !req.user)
    {
        res.status(400);
        throw new Error('Invalid ID')
    }
    
   //Logged in User Matches the Goal User
    if(req.user.id === goal.user.toString())
    {
        const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{new:true})

        res.status(200).json(updatedGoal )
    }
    else
    {
        res.status(400);
        throw new Error('Invalid ID')
    }

})


// @desc Delete Goals
// @route DELETE /api/goals/:id
// @access Private
const deleteGoals = asyncHandler (async (req,res)=>
{
    const goal= await Goal.findById(req.params.id)
   
    if(!goal || !req.user)
    {
        res.status(400);
        throw new Error('Invalid ID')
    }
    
    if(req.user.id === goal.user.toString())
    {
        await Goal.findByIdAndDelete(req.params.id)
        res.status(200).json(req.params.id)
    }
    else
    {
        res.status(400);
        throw new Error('Invalid ID')
    }


   
})



module.exports={
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}