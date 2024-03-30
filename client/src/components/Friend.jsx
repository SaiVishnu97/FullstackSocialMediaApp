import React from 'react'
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Typography,IconButton } from '@mui/material';
import { useSelector,useDispatch } from 'react-redux';
import { setFriends } from 'state';
import { useNavigate } from 'react-router-dom';

const Friend = ({friendid,subtitle,name,userpicturepath,_id,token,isAnotherUser}) => {

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const friends=useSelector((state)=>state.user.friends);
    const isFriend = friends.find((friend) => friend._id === friendid);
    const patchFriend= async ()=>{
        const response= await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${_id}/${friendid}`,{
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
        });
        const formattedfriends=await response.json();
        dispatch(setFriends({friends:formattedfriends}));
    }
    const handleFriendClick=(event)=>
    {
      navigate(`/profile/${friendid}`);
    }
  return (
       <div className='postcardfirsthalf' onClick={handleFriendClick}>
            <img src={`${process.env.REACT_APP_BACKEND_URL}/${userpicturepath}`}></img>
            <div>
            <h6>{name}</h6>
            <small>{subtitle}</small>
            </div>
            {!isAnotherUser&&<div>
            {friendid!==_id&&<IconButton
        onClick={(event) => {
          event.stopPropagation();
          patchFriend();
        }}
        sx={{ backgroundColor: 'rgb(230,251,255)', p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: '#006B7D' }} />
        ) : (
          <PersonAddOutlined sx={{ color: '#006B7D' }} />
        )}
      </IconButton>}
            </div>}
        </div>
  )
}

export default Friend