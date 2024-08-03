import React from 'react'
import logo from '../../../../assets/img/4 3.png'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
export default function Register() {
  return (
    <div className="auth-container">
      <div className="row vh-100 justify-content-center align-items-center bg-overlay">
        <div className="col-md-5 bg-white py-5 rounded rounded-2 px-5">
          <div className="content">
          <div className="text-center img">
            <img src={logo} alt="login"  className='w-50 img-fluid'/>
            </div>
            <div className="title mb-3">
              <h3>Log in</h3>
              <p>Welcome back! please enter your details</p>
            </div>
            <div className="row">
              <div className="col p-4">
      <InputGroup className="my-4">
        <InputGroup.Text id="basic-addon1"><i className="fa-solid fa-envelope"></i></InputGroup.Text>
        <Form.Control
          placeholder="Enter Your E-mail"
          aria-label="email"
          aria-describedby="basic-addon1"/>        
      </InputGroup>
      <InputGroup className="my-4">
        <InputGroup.Text id="basic-addon1"><i className="fa-solid fa-envelope"></i></InputGroup.Text>
        <Form.Control
          placeholder="Enter Your E-mail"
          aria-label="email"
          aria-describedby="basic-addon1"/>        
      </InputGroup>
      <InputGroup className="my-4">
        <InputGroup.Text id="basic-addon1"><i className="fa-solid fa-envelope"></i></InputGroup.Text>
        <Form.Control
          placeholder="Enter Your E-mail"
          aria-label="email"
          aria-describedby="basic-addon1"/>        
      </InputGroup>
              </div>
              <div className="col p-4 ">
      <InputGroup className="my-4">
        <InputGroup.Text id="basic-addon1"><i className="fa-solid fa-envelope"></i></InputGroup.Text>
        <Form.Control
          placeholder="Enter Your E-mail"
          aria-label="email"
          aria-describedby="basic-addon1"/>        
      </InputGroup>
      <InputGroup className="my-4">
        <InputGroup.Text id="basic-addon1"><i className="fa-solid fa-envelope"></i></InputGroup.Text>
        <Form.Control
          placeholder="Enter Your E-mail"
          aria-label="email"
          aria-describedby="basic-addon1"/>        
      </InputGroup>
      <InputGroup className="my-4">
        <InputGroup.Text id="basic-addon1"><i className="fa-solid fa-envelope"></i></InputGroup.Text>
        <Form.Control
          placeholder="Enter Your E-mail"
          aria-label="email"
          aria-describedby="basic-addon1"/>        
      </InputGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
