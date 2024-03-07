import React from 'react'
import { InputBase, IconButton, Button } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import './MyPostWidgets.css'
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'state';


const MyPostWidgets = ({picturepath}) => {

    const [post,setPost]=React.useState('');
    const [image,setImage]=React.useState(null);
    const dispatch=useDispatch();
    const {_id} = useSelector((state)=>state.user);
    const token=useSelector(state=>state.token);

    const handleImageChange=(event)=>{
        const imagefile=event.target.files[0];
        setImage(imagefile);
    }
    const handlePost= async ()=>{
        console.log(image,post);
        const formdata=new FormData();
        formdata.append('userid',_id);
        formdata.append('description',post);
        if(image){
        formdata.append('picture',image);
        formdata.append('picturepath',image.name);
        }
        try{
        const response= await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts`,{
            headers:{
                Authorization: `Bearer ${token}`
            },
            method: 'POST',
            body: formdata
        });
        if(!response.ok)
        throw new Error(response.status);
        const posts =await response.json();
        dispatch(setPosts({posts}));
        setImage(null);
        setPost('');
    }catch(err)
    {
        alert(err);
    }
    }
  return (
    <div className='MyPostCard'>
        <div className='firsthalf'>
        <img src={`${process.env.REACT_APP_BACKEND_URL}/${picturepath}`}></img>
        <InputBase placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "70%",
            backgroundColor: 'rgb(240,240,240)',
            borderRadius: "2rem",
            padding: "1rem 2rem"}}/>
        </div>
        {image&&<div className='MyPostImage'>
          <img src={URL.createObjectURL(image)}/>
          </div>
        }
        <div className='secondhalf'>
          
        <input 
          accept="image/*" 
          style={{ display: 'none' }} 
          id="icon-button-file" 
          type="file" 
          onChange={handleImageChange} 
        />
        <label htmlFor="icon-button-file">
          <IconButton 
            color="rgb(134,134,134)" 
            aria-label="upload picture" 
            component="span"
          >
          <ImageIcon  sx={{ fontSize: 30 }}/>
          </IconButton>
        </label>
       {image&&<Button 
          variant="contained" 
          onClick={()=>setImage(null)}
          sx={{width:'80px'}}
        >
          Cancel upload
        </Button>}
        <Button 
          variant="contained" 
          onClick={handlePost}
          sx={{width:'100px'}}
          disabled={!(post||image)}
        >
          POST
        </Button>
        </div>

    </div>
  )
}

export default MyPostWidgets