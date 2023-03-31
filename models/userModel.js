const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
username:{
    type:String,
    required:true,
    trim:true
},
email:{
    type:String,
    required:true,
    trim:true,
    unique:true,
    validate :{
        validator : (value) =>{
            const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            return value.match(regexEmail)

        },
        message:"Please Enter Valid Email Address..."
    }
},
password:{
    type:String,
    required:true,
    trim:true
},
is_Online:{
    type:String,
    required:true,
    default:"0"
},
userImage:{
    type:String,
    required:true
}


},
{timestamps:true}
)

const User = mongoose.model("User",userSchema);
module.exports = User