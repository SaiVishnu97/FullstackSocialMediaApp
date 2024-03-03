import React from 'react'
import {
    ChatBubbleOutlineOutlined,
    Comment,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
  } from "@mui/icons-material";
import { IconButton,Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import './PostWidget.css'
import Friend from 'components/Friend';
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
    const [isComments,setIsComments]=React.useState(false);
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
    
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
        <IconButton >
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