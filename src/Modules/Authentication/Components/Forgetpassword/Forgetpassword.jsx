import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import logo from '../../../../assets/img/4 3.png'
import bike from '../../../../assets/img/bike3 3.png'
import { useForm } from 'react-hook-form';
import {toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Forgetpassword() {


  let navigate=useNavigate()

  let{
    register,
    handleSubmit,
    formState:{errors},
  }=useForm()

  let submit=async (data)=>{
    try{
      let res=await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request",data)
      navigate("/reset")
      toast.success("check your password")
    }
    catch(err){}
  }



  return (
    <div className="auth-container">
      <div className="row vh-100 justify-content-center align-items-center bg-overlay ">
        <div className="col-md-5  bg-white py-5 rounded rounded-2">
          <div className="content px-5">
            <div className="img text-center">
              <img src={logo} alt="logo" className='w-50' />
            </div>
            <div className="title py-4">
              <h2 className='text-capitalize ' style={{fontWeight:"700",color:"rgba(73, 73, 73, 0.9)"}}>Forgot Your Password?</h2>
              <p style={{color:"rgba(73, 73, 73, 0.6)"}}>No worries! Please enter your email and we will send a password reset link </p>
            </div>
            <form onSubmit={handleSubmit(submit)}>
            <InputGroup className="mt-2">
        <InputGroup.Text id="basic-addon1"><i className="fa-solid fa-mobile-screen-button"></i></InputGroup.Text>
        <Form.Control
          placeholder="Enter Your E-mail"
          aria-label="email"
          aria-describedby="basic-addon1"
          {...register("email",{
            required:"This field is required",
            pattern:{
              value:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message:"Enter a valid email"
            }
          })}
        />        
      </InputGroup>
      {errors.email&&<p className='text-danger mt-1'>{errors.email.message}</p>}
      <div className="img-bike">
        <img src={bike} alt="bike" width={"100px"} />
      </div>

      <button type='submit' className="btn btn-success d-block w-100 my-4 fs-4">submit</button>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
