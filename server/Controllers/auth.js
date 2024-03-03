import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import User from '../models/user.js'
import {v4 as uuid4} from 'uuid'
import fs from 'fs'
import path from "path";

export const register=async (req,res)=>
{
    try{
    const {
        firstname,
        lastname,
        email,
        password,
        occupation,
        friends,
        location
    } =req.body;

    const salt= await bcrypt.genSalt();
    const hashedpassword=await bcrypt.hash(password,salt);
    const filenamerandstring=uuid4();
    if(req.file){
    const dirname=path.dirname(req.file.path);
    const ext=(req.file.originalname).split('.')[1];
    var picturepath=`assets/${filenamerandstring}.${ext}`;
    fs.renameSync(`${req.file.path}`,`${dirname}/${filenamerandstring}.${ext}`);
    }
    const newUser=new User({
        firstname,
        lastname,
        email,
        password:hashedpassword,
        occupation,
        picturepath,
        friends,
        location,
        viewedprofiles: Math.floor(Math.random()*10000),
        impressions: Math.floor(Math.random()*10000)
    });
    const saveduser= await newUser.save();
    res.status(201).json(saveduser);

    }catch(err){
    res.status(500).json({errormessage: err.message});
    }
}

export const login= async(req,res)=>
{
    try
    {
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user) return res.status(400).json({errormessage:'User authentication failed'});

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({errormessage:'Wrong password entered'});

        const token=jwt.sign({id: user._id},process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({user,token});
    }catch(err){
        res.status(500).json({errormessage: err.message});
    }
}