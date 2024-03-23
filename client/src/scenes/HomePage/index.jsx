import React from 'react'
import NavBar from 'scenes/NavBar'
import UsersWidget from 'components/UsersWidget'
import MyPostWidgets from 'scenes/Widgets/MyPostWidgets'
import { useSelector } from 'react-redux'
import PostsWidget from 'scenes/Widgets/PostsWidget'
import FriendListWidget from 'scenes/Widgets/FriendListWidget'
import { Navigate } from 'react-router-dom'

const HomePage = () => {

  const currentstateuser=useSelector(state=>state.user);
  const token=useSelector(state=>state.token);
  if(!currentstateuser||!token)
  {
    return <Navigate to='/'></Navigate>
  }
  const {_id:userId,picturepath} =currentstateuser;
  return (
    <div>
      <NavBar/>
    <div style={{display:'grid',gridTemplateColumns: '1fr 1fr 1fr',gap:'30px'}}>
    <UsersWidget userId={userId} picturepath={picturepath} />
    <div style={{height:'fit-content'}}>
    <MyPostWidgets picturepath={picturepath}/>
    <PostsWidget userid={userId}/>
    </div>
    <div>
      <FriendListWidget userid={userId}/>
    </div>
      </div>  
      
    </div>
  )
}

export default HomePage