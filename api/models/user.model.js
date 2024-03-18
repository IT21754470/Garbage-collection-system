import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    },
    avatar: {
        type: String,
        default: "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
   // isEmployee: {
      //  type: Boolean,
      //  default: false,
   // },
    address: {
        type: String,
        required: true,
    },
    lane: {
        type: String,
        required: true,
        enum: ['Lane A', 'Lane B', 'Lane C'], 
    },
    

},{timestamps:true})

const User=mongoose.model('User',userSchema);

export default User;                         