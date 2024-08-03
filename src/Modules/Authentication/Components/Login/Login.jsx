import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../../assets/img/4 3.png'
import axios from 'axios';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Login() {

  let navigate=useNavigate()

  let{
    register, 
    handleSubmit,
    formState:{errors},
    }=useForm()


    let submit=async (data)=>{
      try{
        let res=await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Login",data)
        toast.success("Login Success")
        navigate("/dashboard")
        console.log(res.data.token)
      }
      catch(err){
        if(err.response.status===404){
          toast.error(err.response.data.message)
        }
        else{
          toast.error("Invalid email or password")
        }
      }
    }

  return (   
    <div className="auth-container">
      <div className="row  vh-100 justify-content-center align-items-center bg-overlay">
        <div className=" col-md-5 bg-white py-5 rounded rounded-2">
          <div className='px-5'>
            <div className="text-center img">
            <img src={logo} alt="login"  className='w-50 img-fluid'/>
            </div>
            <div className="title mb-3">
              <h3>Log in</h3>
              <p>Welcome back! please enter your details</p>
            </div>
            <form onSubmit={handleSubmit(submit)}>
      <InputGroup className="my-4">
        <InputGroup.Text id="basic-addon1"><i className="fa-solid fa-envelope"></i></InputGroup.Text>
        <Form.Control
          placeholder="Enter Your E-mail"
          aria-label="email"
          aria-describedby="basic-addon1"
          {...register("email",{
            required:"Email is Required",
            pattern:{
              value:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message:"Email is not matched"
            }
          })}
        />        
      </InputGroup>

      {errors.email&&<p className='text-danger'>{errors.email.message}</p>}


      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon2"><i className="fa-solid fa-key"></i></InputGroup.Text>
        <Form.Control
          placeholder="Enter Your Password"
          aria-label="password"
          aria-describedby="basic-addon2"
          {...register("password",{
            required:"password is required",
            pattern:{
              message:"Enter a valid password"
            }
          })}
        />
      </InputGroup>
      
      {errors.password&&<p className='text-danger'>{errors.password.message}</p>}

      <div className="link d-flex justify-content-between">
        <Link to={"/register"} className='text-success text-decoration-none'>Register Now?</Link>
        <Link to={"/forgetpassword"} className='text-success text-decoration-none'>ForgetPassword</Link>
      </div>

      <button type='submit' className="btn btn-success d-block w-100 my-3">Login</button>
            </form>
            </div>
        </div>
      </div>
    </div>

  )
}
