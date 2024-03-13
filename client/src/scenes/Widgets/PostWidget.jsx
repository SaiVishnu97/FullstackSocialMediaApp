import React from 'react'
import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
  } from "@mui/icons-material";
import { IconButton,Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import './PostWidget.css'
import Friend from 'components/Friend';
import { setPost } from 'state';
const PostWidget = ({
    postid,
    postuserid,
    name,
    description,
    location,
    picturepath,
    userpicturepath,
    likes,
    comments
}) => {
    const dispatch=useDispatch();
    const [isComments,setIsComments]=React.useState(false);
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
    
    const patchLike= async()=>{
      try {
        console.log(loggedInUserId);
        const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts/${postid}/like`,{
          headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          method: 'PATCH',
          body: JSON.stringify({userid: loggedInUserId})
        });
        console.log(response);
        const data= await response.json();
        console.log(data);
        dispatch(setPost({post:data}));
      } catch (error) {
        console.log(error);
        alert('Oops something went wrong when you are liking the post',error.message);
      }
     
    }

  return (
    <div className='postcard'>
        <Friend _id={loggedInUserId} token={token} friendid={postuserid} subtitle={location} 
        name={name} userpicturepath={userpicturepath} />
        <div className='postcardsecondhalf'>
            <div>
            {/^assets/.test(picturepath)&&<img src={`${process.env.REACT_APP_BACKEND_URL}/${picturepath}`}></img>}
            </div>
            <small>{description}</small>
        </div>
        <div className='postcardthirdhalf'>
        <div style={{display:'flex',justifyContent:'flex-start' ,alignItems:'center'}}>
        <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: 'black' }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
        </div>
        <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
        <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
        </div>
        <div>
        <IconButton>
          <ShareOutlined />
        </IconButton>
        </div>
        </div>
        <div className='CommentSection'>
        {isComments&&comments.map((comment)=>{
          return(<div className='EachComment'>
            {comment}
          </div>)
        })}
        </div>
    </div>
  )
}

export default PostWidget