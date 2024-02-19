import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
        min:2,
        max:30
    },
    lastname:{
        type: String,
        required: true,
        min:2,
        max:30
    },
    email:
    {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        min: 5
    },
    picturepath:{
        type: String,
        default: ''
    },
    friends:{
        type: Array,
        default: []
    },
    location: String,
    occupation: String,
    viewedprofiles: Number,
    impressions: Number
},{timestamps:true});

const User=mongoose.model('users',UserSchema);

export default User;