import React from 'react'

import { Container,Form, Card, Row,Col, Button} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {auth} from '../firebase.js'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FaArrowRightFromBracket } from "react-icons/fa6";


export default function Signup() {
    const [userEmail,setUserEmail]=useState("");
    const [userPassword,setUserPassword]=useState("");
    const navigate=useNavigate();
    
    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, userEmail, userPassword);
            const token= await userCredential.user.getIdToken();
            localStorage.setItem("token", token);
            navigate('/');
        }
        catch(err){
        alert("Your email or password is invaild.\n Erorr details: "+ err.message);
        }
    };

  return (
    <Container fluid className={`login-page-bg w-100 d-flex justify-content-center align-items-center`}>
      <Row className={`w-100 d-flex justify-content-center align-items-center` }>
        <Col xs={10} sm={10} md={8} lg={6} xl={5} >
        <Form onSubmit={handleSubmit}>
        <Card className="login-card d-flex flex-column p-4">
          <div className='d-flex'>
                    <Link to='/welcome' ><FaArrowRightFromBracket className='loginBackIcon'/></Link>
                    </div>
            <Card.Title className={"mt-3 mb-4 text-center"}>Signup</Card.Title>

            <Form.Group className={`d-flex flex-column justify-content-center align-items-center mb-4`} controlId="login">
                <Form.Label>Enter your email:</Form.Label>
                <Form.Control className='loginInput' type="email"
                 placeholder="example@company.com" value={userEmail}
                 onChange={(e)=>(setUserEmail(e.target.value))}></Form.Control>
            </Form.Group>

              <Form.Group className={`d-flex flex-column justify-content-center align-items-center mb-4`} controlId="password">
                <Form.Label>Enter your password:</Form.Label>
                <Form.Control className='passwordInput' type="password"
                value={userPassword} onChange={(e)=>(setUserPassword(e.target.value))}></Form.Control>
            </Form.Group>

            <Container fluid className='d-flex justify-content-center mt-2 mb-4' style={{maxWidth:'170px'}}>
           <Button className="btnLogin w-100" type='submit'>Signup</Button>
            </Container>
                 <Container fluid className='d-flex flex-column align-items-center justify-content-center gap-0'>
          <p className='m-0'>do you already have an account?</p>
          <Button  className="btn-Login " variant='link' as={Link} to='/login'>Login</Button>
            </Container>
        </Card>
        </Form>
        </Col>
      </Row>
    </Container>
  )
}
