import React from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import "../../styling/NavBar.css";
import LightModeIcon from '@mui/icons-material/LightMode';
import MessageIcon from '@mui/icons-material/Message';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
        <h2 style={{color:'rgb(0,127,255)',fontSize:'30px',margin:'10px'}}>SocialMediaApp</h2>
        <InputBase placeholder="Search..." sx={{
            width: "70%",
            backgroundColor: 'rgb(240,240,240)',
            borderRadius: "2rem",
            padding: "1rem 2rem"}}/>
      </div>
      <div className='NavBarflex-2'>
        <LightModeIcon sx={{ fontSize:'30px' }}/>
        <MessageIcon/>
        <NotificationsIcon/>
        <div style={{fontSize:'medium',fontWeight:'700'}}>{fullname}</div>
  <a style={{cursor:'pointer',color:'blue',fontSize:'medium',textDecoration:'underline'}} onClick={()=>{dispatch(setLogout());navigate('/');}}>Logout</a>
        <ContactSupportIcon/>
      </div>
    </div>
  )
}
function CustomizedInputBase() {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', borderRadius:'10px',display: 'flex', alignItems: 'center', width: 300 }}
    >
     
      <InputBase
        sx={{ ml: 1, flex: 1,borderRadius:'20px' }}
        placeholder="Search here..."
        inputProps={{ 'aria-label': 'Search here...' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      
    </Paper>
  );
}
export default NavBar