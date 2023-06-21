const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type : String,
        // required : true
    },
    emailId: {
        type : String,
        // required : true
    },
    password:{
        type :String,
        // required :true
    },
    
    phoneNo:{
        type :Number,
        // required :true
    },
    
    address:{
        type :String,
        // required :true
    },
    
    profilePic:{
        type :String,
        required :true
    },

    role:{
        type :String,
        default: "user",
        
    },
    isActive:{
        type: Boolean,
        default: true
    },
  
})
userSchema.set('timestamps', true)
module.exports = mongoose.model('user', userSchema)