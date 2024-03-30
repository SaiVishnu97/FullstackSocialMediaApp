import React, { useContext, useEffect } from 'react'
import { createContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from 'state';

const ThemeContext=createContext();

export const useTheme = ()=>
{
    return useContext(ThemeContext);
}
const ModeContext = ({children}) => {

    const [darkmode,setDarkMode]=React.useState(false)
    const dispatch=useDispatch();
    const mode=useSelector((state)=>state.mode);
    const toogleTheme=()=>{setDarkMode(prev=>!prev);
      dispatch(setMode(darkmode?'dark':'light'))
    }
    useEffect(()=>document.documentElement.setAttribute('data-theme',mode),[darkmode]);
    
  return (
    <ThemeContext.Provider value={{toogleTheme}}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ModeContext