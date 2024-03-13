import React from 'react'

import "./NavBar.css";
import LightModeIcon from '@mui/icons-material/LightMode';
import MessageIcon from '@mui/icons-material/Message';
import Searchahead from './Searchahead';

import NotificationsIcon from '@mui/icons-material/Notifications';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import {  useDispatch, useSelector } from 'react-redux';
import { setLogout } from 'state';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

  const user = useSelector((state) => state.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  if(user)
  var fullname = `${user.firstname} ${user.lastname}`;
  else
  fullname='Guest'
  return (

    <div className='NavBar'>
      <div className='NavBarflex-1'>
        <h2 style={{color:'rgb(0,127,255)',fontSize:'25px',margin:'10px'}}>SocialMediaApp</h2>
     <Searchahead/>
      </div>
      <div className='NavBarflex-2'>
        <LightModeIcon sx={{ fontSize:'30px' }}/>
        <MessageIcon/>
        <NotificationsIcon/>
        <div style={{fontSize:'medium',fontWeight:'700'}}>{fullname}</div>
  <a style={{cursor:'pointer',color:'blue',fontSize:'medium',textDecoration:'underline'}} onClick={()=>{dispatch(setLogout());navigate('/');}}>Logout</a>
  <a style={{cursor:'pointer',color:'blue',fontSize:'medium',textDecoration:'underline'}} onClick={()=>{navigate('/home');}}>Home Page</a>
        <ContactSupportIcon/>
      </div>
    </div>
  )
}

export default NavBar