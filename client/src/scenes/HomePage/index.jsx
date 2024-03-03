import React from 'react'
import NavBar from 'scenes/NavBar'
import UsersWidget from 'components/UsersWidget'
import MyPostWidgets from 'scenes/Widgets/MyPostWidgets'
import { useSelector } from 'react-redux'
import PostsWidget from 'scenes/Widgets/PostsWidget'
import FriendListWidget from 'scenes/Widgets/FriendListWidget'

const HomePage = () => {

  const {_id:userId,picturepath}=useSelector(state=>state.user);
  console.log(userId,picturepath);
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