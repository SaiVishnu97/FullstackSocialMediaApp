import React from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import Friend from 'components/Friend';
import { setFriends } from 'state';
import './Friends.css'


const FriendListWidget = ({userid,isAnotherUser=false}) => {
    const dispatch=useDispatch();
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);
    const [otheruserfriends,setOtherUserFriends]=React.useState([]);
    React.useEffect(()=>{

    const setFunctionFriends=async ()=>{    
        try
        {
            const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userid}/friends`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            if(!response.ok)
                throw new Error(response.statusText);
            const data=await response.json();
            if(isAnotherUser)
                setOtherUserFriends(data);
            else
                dispatch(setFriends({friends:data}));
        }catch(err)
        {
            alert(err);
        }
    }
    setFunctionFriends();
    },[friends.length,userid])
  return (
    <div className='friendwidgetstyle'>

        <h5 style={{marginTop:'10px'}}>FriendList</h5>
        
        {isAnotherUser&&<div className='friendcss' >
            {otheruserfriends.map((friend)=>{
          return  (<Friend key={friend._id} _id={userid} token={token} friendid={friend._id} subtitle={friend.location} 
            name={`${friend.firstname} ${friend.lastname}`} userpicturepath={friend.picturepath} isAnotherUser={isAnotherUser}/>);
        })}
        </div>}
        {!isAnotherUser&&<div className='friendcss' >
        {friends.map((friend)=>{
          return  (<Friend key={friend._id} _id={userid} token={token} friendid={friend._id} subtitle={friend.location} 
            name={`${friend.firstname} ${friend.lastname}`} userpicturepath={friend.picturepath}  />);
        })}
        </div>}
    </div>
  )
}

export default FriendListWidget