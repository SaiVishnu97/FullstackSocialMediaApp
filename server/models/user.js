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
    location: {
        type: String,
        default: 'Some Where in India'
    },
    occupation: {
        type: String,
        default: 'Some Random Work'
    },
    viewedprofiles: {
        type: Number,
        default: 0
    },
    impressions:{
        type: Number,
        default: 0
    },
},{timestamps:true});

const User=mongoose.model('users',UserSchema);

export default User;