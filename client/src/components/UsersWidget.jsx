import React from 'react'
import './UsersWidget.css'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const UsersWidget = ({picturepath,userId,sameuser}) => {

const [user,setUser]=React.useState(null);
const actualuser=useSelector(state=>state.user);
const token=useSelector((state)=>state.token)
const navigate=useNavigate();
    const getUser=async ()=>
    {
      try{
       const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`,
        {
          method:'GET',
          headers:{
            Authorization: `Bearer ${token}`,
          }
        });
        const data= await response.json();
        setUser(data);
      }catch(err){
        console.log(err);
      }
    }
    const goToTheProfile=()=>{
      if(!sameuser)
      navigate(`/profile/${userId}`);
    }


    React.useEffect(()=>{
      getUser();
    },[actualuser.friends.length,userId]);
    if (!user) {
      return null;
    }
  return (

    <div className='card-user'>
        <div className='userdp' onClick={goToTheProfile}>
            <img src={`${process.env.REACT_APP_BACKEND_URL}/${picturepath}`}></img>
            <div style={{marginLeft:'10px',marginRight:'20px'}}>
                <h6>{`${user.firstname} ${user.lastname}`}</h6>
                {user.friends&&<small>Friends: {user.friends.length}</small>}
            </div>
            <ManageAccountsIcon/>
        </div>
        <div className='location'>
        <div>  <LocationOnOutlinedIcon/>
        <small style={{marginLeft:'10px'}}>Lives in : {user.location}</small>
        </div>    
        <div>  <WorkOutlineIcon/>
        <small style={{marginLeft:'10px'}}>Occupation : {user.occupation}</small>
        </div>  
        
        </div>
        <small style={{margin:'10px'}}>Who's viewed your profile: {user.viewedprofiles}</small>
        <small style={{marginLeft:'10px'}}>Number of impressions: {user.impressions}</small>

    </div>
  )
}

export default UsersWidget