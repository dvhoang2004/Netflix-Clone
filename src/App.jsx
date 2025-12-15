import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import MovieType from './pages/MovieType/MovieType'
import MyList from './pages/MyList/MyList'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { useLanguage } from './context/LanguageContext'
import { auth } from './firebase'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const language = useLanguage();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if(user){
        console.log("Logged In!");
        if(location.pathname === '/login'){
          navigate('/');
        }
      }
      else {
        console.log("Logged Out!");
        if(location.pathname !== '/login'){
          navigate('/login');
        }
      }
    });

    return () => unsubscribe();
  }, [navigate, location.pathname]); 

  return (
    <div>
      <ToastContainer theme='dark'/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/player/:id' element={<Player />}/>
        <Route path='/tv-shows' element={<MovieType />}/> 
        <Route path='/movies' element={<MovieType />}/> 
        <Route path='/mylist' element={<MyList />}/> 
      </Routes>
    </div>
  )
}

export default App