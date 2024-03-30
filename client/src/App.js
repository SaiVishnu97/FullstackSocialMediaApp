import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomePage from 'scenes/HomePage';
import LoginPage from 'scenes/LoginPage';
import ProfilePage from 'scenes/ProfilePage';

import ModeContext from 'ModeContext';

function App() {

  
  return (
    <ModeContext>
      <div className="App"> 
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LoginPage/>}></Route>
            <Route path='/home' element={<HomePage/>}/>
            <Route path='/profile/:userid' element={<ProfilePage/>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
    </ModeContext>
  );
}

export default App;
