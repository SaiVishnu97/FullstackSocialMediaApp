import Post from "../models/Post.js";
import User  from "../models/user.js";



export const createPost= async (req,res)=>{
    try{
        let {userid, description, picturepath} = req.body;

        const user = await User.findById(userid);
        if(req.file)
        {   
            picturepath=`assets/${req.file.originalname}`;
        }
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