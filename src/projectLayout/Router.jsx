import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from '../pages/Home'
import Compose from '../pages/Compose'
import AppLayout from './AppLayout'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import PublicGate from './PublicGate'
import AuthGate from './AuthGate'
import Inbox from '../pages/Inbox'
import Sent from '../pages/Sent'
import Welcome from '../pages/Welcome'


export default function Router() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route element={<PublicGate/>}>
       <Route path='/welcome' element={<Welcome/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
    </Route>
      
      <Route element={<AuthGate/>}>
        <Route path='/' element={<AppLayout/>}>
             <Route index element={<Home/>}></Route>
             <Route path='compose' element={<Compose/>}></Route>
              <Route path='inbox' element={<Inbox/>}></Route>
              <Route path='sent' element={<Sent/>}></Route>
             </Route>
      </Route>
   
    </Routes>
    </BrowserRouter>
    </>
  )
}
