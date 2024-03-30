import React, { useRef, useState } from 'react'
import InputBase from '@mui/material/InputBase';

import useFetchPromise from './useFetchPromise';
import SearchResults from './SearchResults';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Searchahead = () => {

  const token=useSelector((state)=>state.token);
  const [isSelected,setIsSelected]=useState(false);
  const [query,results,setQuery]= useFetchPromise(token,isSelected);
  const navigate=useNavigate();
  const [index,setIndex]=useState(0);
  const inputRef=useRef(null);
  const selectItem=(val)=>{
    setQuery(val.fullname);
    setIsSelected(true);
    inputRef.current.focus();
    navigate(`/profile/${val._id}`);
}
  const keyEvents=(event)=>{
    if(event.keyCode===40&&results)
          setIndex((prevIndex)=>(prevIndex+1)%results.length);
    else if(event.keyCode===38&&results)
    {
      if(index===0)
        setIndex(results.length-1);
      else
        setIndex((prevIndex)=>(prevIndex-1))
    }
    else if(event.key==='Enter'&&results)
    {
      setQuery(results[index].fullname);

      setIsSelected(true);
      navigate(`/profile/${results[index]._id}`)
    }
  }
  return (
    <div>
     
          <InputBase ref={inputRef} 
          placeholder="Search..." sx={{
            width: "70%",
            backgroundColor: 'var(--bg-color)',
            borderRadius: "2rem",
            padding: "1rem 2rem"}} value={query} onChange={(event)=>{setQuery(event.target.value);
            if(isSelected)
            setIsSelected(false);
            }}
            onKeyDown={keyEvents}
            />
          {results&&<SearchResults results={results} selectItem={selectItem} index={index}/>}
            </div>
  )
}

export default Searchahead