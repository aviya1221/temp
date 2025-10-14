import { Container, Row ,Button } from 'react-bootstrap'
import { FaInbox, FaEnvelope, FaHome, FaPen, FaRegUserCircle } from 'react-icons/fa';
import { getAuth } from "firebase/auth";
import { Link } from 'react-router-dom';
import globalVar from '../assets/store.js'
import { useEffect, useState } from 'react';

export default function SideBar({btnStatus}) {

  const [user,setUser]=useState("");
  const logout =globalVar(s=>s.logout)

  useEffect(()=>{
  const auth=getAuth();
  setUser(auth.currentUser.email);
  },[])



  return (
  <Container fluid className='d-flex flex-column align-items-center p-0 sidebar-cont ' style={{ minHeight: '100vh' }}>
  <div className="d-flex flex-column align-items-center justify-content-around p-2 temp">
    <Button className='sidebar-btnMenu' onClick={() => btnStatus()}>
      Menu
    </Button>
   <FaRegUserCircle className='sidebar-userDiv mt-4' size={45}/>
      <span className='user'>{user}</span>
  </div>

  <div className='d-flex flex-column gap-1 h-100 w-100 align-items-center justify-content-around '>
  <div className='d-flex flex-column w-100 align-items-center sidebar-btnCont'>

    <Button className='sidebar-btnOptions' as={Link} to='/'><FaHome /> home</Button>
    <Button className='sidebar-btnOptions' as={Link} to='/compose'><FaPen/> compose</Button>
    <Button className='sidebar-btnOptions' as={Link} to='/inbox'><FaInbox/> inbox</Button>
    <Button className='sidebar-btnOptions' as={Link} to='/sent'><FaEnvelope /> sent</Button>
    </div>
<div className='d-flex flex-column gap-5 w-100 align-items-center mb-3'>
    <Button className='sidebar-btnOptions'  onClick={()=>logout()}> Logout</Button>
    </div>
  </div>
</Container>
  )
}
