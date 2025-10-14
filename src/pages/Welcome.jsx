import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Home from './Home'

export default function Welcome() {
  return (
    <Container fluid className={`login-page-bg w-100 d-flex flex-column justify-content-center align-items-center`}>
        <Home></Home>
        <Container className='w-25 d-flex justify-content-center gap-5 mt-3 welcome-btn'>
        <Button className='welcome-btn' as={Link} to='/login'>Login</Button>
        <Button className='welcome-btn' as={Link} to='/signup'>Signup</Button>
        </Container>
    </Container>
  )
}
