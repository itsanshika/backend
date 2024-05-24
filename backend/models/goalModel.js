const mongoose = require("mongoose")
const goalSchema = mongoose.Schema(
    {
        user:
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }, 
        text:
        {
            type: String,
            required: [true, 'Please add text']
        }
    },
    {
        timestamps: true //create and updated at files automatically created
    }
)

module.exports= mongoose.model('Goal', goalSchema)