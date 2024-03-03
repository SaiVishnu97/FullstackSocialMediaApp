import Post from "../models/Post.js";
import User  from "../models/user.js";
import {v4 as uuid4} from 'uuid'
import fs from 'fs'
import path from "path";


export const createPost= async (req,res)=>{
    try{
        let {userid, description, picturepath} = req.body;

        const user = await User.findById(userid);
        const filenamerandstring=uuid4();
        if(req.file)
        {   
            console.log(req.file);
            const dirname=path.dirname(req.file.path);
            const ext=(req.file.originalname).split('.')[1];
            picturepath=`assets/${filenamerandstring}.${ext}`;
            fs.renameSync(`${req.file.path}`,`${dirname}/${filenamerandstring}.${ext}`);
        }
    console.log(user,picturepath);
        const newPost = new Post({
            userid,
            firstname: user.firstname,
            lastname: user.lastname,
            location: user.location,
            description,
            userpicturepath: user.picturepath,
            picturepath,
            likes: {},
            comments: [],
        });
        await newPost.save();
        const post= await Post.find();
        res.status(201).json(post);
    }catch(err){
        console.log(err);
        res.status(409).json({message: err.message});
    }
}

//READ

export const getFeedPosts= async(req,res)=>
{
    try{
        const post = await Post.find();
        res.status(200).json(post);
    }catch(err){
        res.status(404).json({message: err.message});
    }
}

export const getUserPosts = async (req,res)=>
{
    try{
    const {userid} = req.params;
    const  post = await Post.find({userid});
    res.status(200).json(post);
    }catch(err){
        res.status(404).json({message: err.message});
    }
}

export const likePost= async(req,res)=>{
    
    try{
        const {id} = req.params;
        const {userid} = req.body;
        const post = await Post.findById(id);
        const isLiked= post.likes.get(userid);

        if(isLiked)
        {
            post.likes.delete(userid);
        }
        else
            post.likes.set(userid,true);

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true}
        );
        res.status(200).json(updatedPost);
    }catch(err){
        res.status(404).json({message: err.message});
    }

}