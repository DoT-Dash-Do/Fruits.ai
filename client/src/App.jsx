import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from './pages/Login';
import './App.css'
import PageNotFound from './pages/PageNotFound';
import Home from './pages/Home';
import ChatBot from './pages/ChatBot';
import { useNavigate } from 'react-router-dom';

function App() {
  const navig = useNavigate();
  const [logIn,setLogIn] = useState(false);
  useEffect(()=>{
    if(window.localStorage.getItem("LOGIN"))
    {
      setLogIn(true);
    }
    else
    {
      setLogIn(false);
    }
  },[]);

  return (
    <Routes>
      {logIn && (<>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/chatbot' element={<ChatBot/>}/>
        <Route path='*' element={<PageNotFound/>}/>
        
      </>
        )   
      }
      {
        !logIn && (
          <>
          <Route path='/' element={<Home/>}/>
          <Route path='*' element={<PageNotFound/>}/>
          </>
        )
      }
      
    </Routes>
  )
}

export default App
