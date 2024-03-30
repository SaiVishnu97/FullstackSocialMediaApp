import React from 'react'

const SearchResults = ({results,selectItem,index}) => {

  
  return (
    <div className='dataResult'>
        {results.slice(0,5).map((val,ind)=>{
          let touchthetext='';
            if(ind===index)
              touchthetext='highlight'
            else
              touchthetext='';
            return (<div className={`dataItem ${touchthetext}`} onClick={()=>{selectItem(val)}} >{val.fullname}</div>)})}
    </div>
  )
}

export default SearchResults