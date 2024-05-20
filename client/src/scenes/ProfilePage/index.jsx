import React, { useEffect, useState } from 'react'
import NavBar from 'scenes/NavBar'
import UsersWidget from 'components/UsersWidget'
import { useSelector } from 'react-redux'
import PostsWidget from 'scenes/Widgets/PostsWidget'
import FriendListWidget from 'scenes/Widgets/FriendListWidget'
import { Navigate, useParams } from 'react-router-dom'
import 'scenes/HomePage/HomePage.css'


const ProfilePage = () => {


  const token=useSelector(state=>state.token);
  const {userid}=useParams();
  const [user,setUser]=useState(null);
  const getUser=async ()=>
  {
    try {
      const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userid}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      const data=await response.json();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
    
  }
  useEffect(()=>{
    getUser();
  },[userid])
  if(!token)
  {
    return <Navigate to='/'></Navigate>
  }
  if(!user)
    return null;

  return (
    <div>
      <NavBar/>
    <div className='maincontent'>
    <UsersWidget userId={userid} picturepath={user.picturepath} sameuser={true}/>
    <div style={{height:'fit-content'}}>
    {/* <MyPostWidgets picturepath={user.picturepath}/> */}
    <PostsWidget userid={userid} isProfile={true}/>
    </div>
    <div>
      <FriendListWidget userid={userid} isAnotherUser={true}/>
    </div>
      </div>  
      
    </div>
  )
}

export default ProfilePage