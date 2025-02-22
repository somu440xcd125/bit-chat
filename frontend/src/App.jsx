import React, { useEffect } from 'react'
import Navbar from './conponentrs/Navbar'
import { Route,Routes,Navigate } from 'react-router-dom'
import HomePage from    './pages/HomePage'
import SignUpPage from  './pages/SignUpPage'
import LogInPage from   './pages/LoginPage'
import SettingPage from './pages/SettingPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import {Toaster} from "react-hot-toast"
import { useThemeStore } from './store/useThemeStore'

const App = () => {
const {authUser,checkAuth,isCheckingAuth,onlineUsers}=useAuthStore();
const {theme}=useThemeStore()

console.log({onlineUsers})

useEffect(()=>{
  checkAuth()
},[checkAuth])


if(isCheckingAuth && !authUser) return(
  <div className='flex items-center justify-center h-screen'>
    <Loader className="size-10 animate-spin"/>

  </div>
)
  
  return (
    <div data-theme={theme}>
      <Navbar/>
      <Routes>
        <Route path='/' element={authUser?<HomePage/>:<Navigate to='/login'/>}/>
        <Route path='/signup' element={!authUser?<SignUpPage/>:<Navigate to='/'/>}/>
        <Route path='/login' element={!authUser?<LogInPage/>:<Navigate to='/'/>}/>
        <Route path='/settings' element={<SettingPage/>}/>
        <Route path='/Profile' element={authUser?<ProfilePage/>:<Navigate to='/login'/>}/>
      </Routes>
      <Toaster/>
    </div>
    
  )
}

export default App