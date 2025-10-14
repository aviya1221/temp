import React, { useEffect } from 'react'
import { Container, Card, Row, Col } from 'react-bootstrap'
import globalVar from '../assets/store.js'


export default function Home() {
const user = globalVar(s=>s.user);
  return (
    <Container className="home-cardCont d-flex flex-column align-items-center justify-content-center">
      <Card className="home-card shadow-lg p-4 mb-1 w-100">
        <h2 className="mb-3 text-center fw-bold home-title">Welcome to the Email App!</h2>
        <p className="lead text-center mb-4">
          A modern, simple and secure email platform for easy communication between registered users.
        </p>
        <Row className="mb-4">
          <Col md={4} className="mb-3 mb-md-0">
            <Card className="h-100 border-0 shadow-sm home-feature-card">
              <Card.Body>
                <Card.Title className="fw-semibold home-feature-title">How does it work?</Card.Title>
                <Card.Text >
                  <ul className='d-flex flex-column gap-3'>
                    <li>Sign up quickly with your email address.</li>
                    <li>Send and receive messages with other registered users.</li>
                    <li>Your inbox collects all incoming messages.</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <Card className="h-100 border-0 shadow-sm home-feature-card">
              <Card.Body>
                <Card.Title className="fw-semibold home-feature-title">Main Features</Card.Title>
                <Card.Text className='home-feature-text'>
                  <ul className='d-flex flex-column gap-2'>
                    <li><b>Inbox</b> – View all emails you received from other users.</li>
                    <li><b>Sent</b> – Track all emails you have sent.</li>
                    <li>Compose new messages easily and securely.</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm home-feature-card">
              <Card.Body>
                <Card.Title className="fw-semibold home-feature-title">AI-Powered Summaries</Card.Title>
                <Card.Text>
                  <ul className='d-flex flex-column gap-1'>
                    <li>Get quick summaries of your emails with the power of AI.</li>
                    <li>Save time by reading the key points of long emails.</li>
                    <li>Understand the context of an email at a glance.</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {user===null?(
        <div className="text-center">
          <span className="home-highlight">
            Start by signing up or logging in, and enjoy seamless communication!
          </span>
        </div>
):<></>}
      </Card>
    </Container>
  )
}
