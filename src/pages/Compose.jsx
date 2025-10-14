import React from 'react'
import { Button, Container, Form, Row,Col } from 'react-bootstrap'
import globalVar from '../assets/store.js'
import { sendMail } from "../api/mailApi";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


export default function Compose() {
   const {showSideBar} =globalVar();
   const [pending, setPending] = useState(false);
    const navigate = useNavigate();

   const handleSend = async(e)=>{
    e.preventDefault();
    const formData= new FormData(e.currentTarget);
    const mailObj =Object.fromEntries(formData.entries());
    console.log(mailObj)

    try {
      setPending(true);
      await sendMail({mailObj});
      navigate('/sent');

    } 
    catch (err) {
      alert(err.message);
    }
     finally {
      setPending(false);
    }
  };
    
  return (
    <Container fluid className={`compose-conFlu h-100 pt-3  d-flex flex-column align-items-center ${showSideBar?`justify-content-center`:`justify-content`}`}style={{paddingLeft:"0", paddingRight: "20px"}} >
        <Form onSubmit={handleSend}className='w-100 h-100 ' style={{marginLeft:'1.5625rem'}}>
        <Row className={`w-100 d-flex ${!showSideBar?`justify-content-center`:`justify-content-start`}`}>
            <Col  xs={
                showSideBar?12:6} sm={5} md={4} >
            <Form.Group className="mb-3 text-start">
                <Form.Label className='fw-bold'>To</Form.Label>
                <Form.Control type="email" name='to' placeholder="Enter email address here"
                 onKeyDown={e => {
                    if (e.key === 'Enter') e.preventDefault();}}/>
            </Form.Group>
            </Col>
        </Row>

        <Row className={`w-100  ${!showSideBar?`justify-content-center`:`justify-content-start`}`}>
               <Col xs={showSideBar?12:8} sm={showSideBar?9:7} md={6} >
            <Form.Group className="mb-4 text-start">
                <Form.Label className='fw-bold'>Subject</Form.Label>
                <Form.Control type="text" name='title' placeholder="Enter title here" dir='auto'
                 onKeyDown={e => {
                    if (e.key === 'Enter') e.preventDefault();}}/>
            </Form.Group>
            </Col>
        </Row>

            <Row className={`w-100  ${!showSideBar?`justify-content-center`:`justify-content-start`}`}
             style={{minHeight:"35vh"}}>
                <Col xs={showSideBar?12:10} md={10} >
                <Form.Group className=" h-100 w-100 text-start">
                    <Form.Control className='h-100 w-100' 
                    as={'textarea'} name='message' placeholder="Enter text here" dir="auto"/>
            </Form.Group>
            </Col>
            </Row>

           <Row className={` w-100 mt-3 d-flex ${!showSideBar ? 'justify-content-center' : 'justify-content-start'}`}>
            <Col xs={showSideBar ? 9 : 10}>
                <Button className={`compose-btn ${showSideBar?`w-50`:`w-25`}`} variant="outline-light"
                type='submit'>Send</Button>
            </Col>
            </Row>
         </Form>
    </Container>
  )
}
