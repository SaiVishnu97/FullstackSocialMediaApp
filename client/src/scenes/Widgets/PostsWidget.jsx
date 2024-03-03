import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from 'state';
import PostWidget from './PostWidget';

const PostsWidget = ({userid,isProfile=false}) => {

    const dispatch=useDispatch();
    const posts=useSelector(state=>state.posts);
    const token=useSelector(state=>state.token);

    const getPosts=async ()=>{
        const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts/`,{
            headers:{Authorization:`Bearer ${token}`}
        });
        const data=await response.json();
        console.log(data);
        dispatch(setPosts({posts:data}));
    }
    const getUserPosts=async ()=>{

        const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts/${userid}/posts`,{
            headers:{Authorization:`Bearer ${token}`}
        });
        const data=await response.json();
        dispatch(setPosts({posts:data}));
    }
    React.useEffect(()=>{
        if (isProfile) {
            getUserPosts();
          } else {
            getPosts();
          }
    },[]);
  if(Array.isArray(posts)===false)
  return null;
  return (
    <div>
        {
         posts.map(({comments,
            createdAt,
            description,
            firstname,
            lastname,
            likes,
            location,
            picturepath,
            userpicturepath,
            userid,
            _id})=>   
        <PostWidget
        key={_id} postid={_id} postuserid={userid} name={`${firstname} ${lastname}`} description={description} location={location} picturepath={picturepath} userpicturepath={userpicturepath} likes={likes} comments={comments}
        ></PostWidget>)
}
    </div>
  )
}

export default PostsWidget