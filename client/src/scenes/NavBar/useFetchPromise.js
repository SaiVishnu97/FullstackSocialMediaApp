import React, { useEffect, useState } from 'react'
import { debounce } from 'lodash';

const useFetchPromise = (token,isSelected) => {
    const [query,setQuery]=useState(null);
    const [results,setResults]=useState(null);
    const fetchUsers= debounce(async(signal)=>{
      try{
        const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/pattern?pattern=${query}`,{
          headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          method:"GET",
          signal
        });
        const data=await response.json();
        
        setResults(data.resarrnames);
      }catch(error)
      {
        if(error.message.split(' ').includes('signal'))
           return;
        console.log(error.message);
        alert('Error while pattern matching');
      }
    },400);

    useEffect(()=>{
      if(!query||isSelected)
      {
        setResults(null);
        return;
      }
      const controller=new AbortController();
      const signal=controller.signal;
      fetchUsers(signal);
      return ()=>{
        controller.abort();
      }
    },[query]);
  return [query,results,setQuery];
}

export default useFetchPromise