import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Username required"],
    trim:true,
    minLength:5,
    maxLength:25,
    },
   
    email:{
        type:String,
        required:[true, 'Email required'],
        unique:true,
        trim:true,
        lowercase:true,
        match:[/\S+@\S+\.\S+/, 'Please input a valid email address']
    },

    password:{
        type:String,
        required:[true, 'PAssword required'],
        minLength:6
    }
}, {timestamps:true});

const User = mongoose.model('User', userSchema)

export default User;