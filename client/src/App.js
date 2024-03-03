import './App.css';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import HomePage from 'scenes/HomePage';
import LoginPage from 'scenes/LoginPage';
import NavBar from 'scenes/NavBar';
import ProfilePage from 'scenes/ProfilePage';
import { CssBaseline,ThemeProvider } from '@mui/material';
import {createTheme} from '@mui/material/styles';
import { themeSettings } from 'theme.js';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';


function App() {

  const mode=useSelector((state)=>state.mode);
  const theme=useMemo(()=>createTheme(themeSettings(mode)),[mode]);

  return (
    <div className="App">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Routes>
        <Route path='/' element={<LoginPage/>}></Route>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/profile/:userid' element={<ProfilePage/>}></Route>

       
      </Routes>
      </ThemeProvider> 

      </BrowserRouter>
    </div>
  );
}

export default App;
