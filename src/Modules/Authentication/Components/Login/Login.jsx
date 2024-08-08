import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "../../auth.module.css";
import { USERS_URL } from '../../../../constant/Api';
import { email_valid, password_valid } from '../../../../constant/Validation';
export default function Login({saveLoginData}) {
  let navigate=useNavigate()
  let{
    register, 
    handleSubmit,
    formState:{errors},
    }=useForm()


    let submit=async (data)=>{
      try{
        let res=await axios.post(USERS_URL.login,data)
        const token=res.data.token
        localStorage.setItem("token",token)
        saveLoginData();
        toast.success("Login Successfully")
        navigate("/dashboard")
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
    <form onSubmit={handleSubmit(submit)}>
      <div className={styles["form-auth"]}>
          <h3>Log in</h3>
          <p>Welcome back! please enter your details</p>
        </div>
        <div className="mb-3">
        <InputGroup>
        <InputGroup.Text id="basic-addon1"><i className="fa-solid fa-envelope"></i></InputGroup.Text>
        <Form.Control
          style={{height:"56px"}}
          type='email'
          placeholder="Enter Your E-mail"
          aria-label="email"
          aria-describedby="basic-addon1"
          {...register("email",email_valid)}
        />        
      </InputGroup>

      {errors.email&&<p className='text-danger'>{errors.email.message}</p>}
    </div>
    <div className="mb-1">
    <InputGroup>
        <InputGroup.Text id="basic-addon2"><i className="fa-solid fa-key"></i></InputGroup.Text>
        <Form.Control
          type="password"
          style={{height:"56px"}}
          placeholder="Enter Your Password"
          aria-label="password"
          aria-describedby="basic-addon2"
          {...register("password",password_valid)}
        />
      </InputGroup>
      {errors.password&&<p className='text-danger'>{errors.password.message}</p>}
    </div>


      <div className="link d-flex justify-content-between mb-4">
        <Link to={"/register"} className='text-dark text-decoration-none'>Register Now?</Link>
        <Link to={"/forget-password"} className='text-success text-decoration-none'>ForgetPassword</Link>
      </div>
      <button type='submit' className="btn btn-success d-block w-100 my-3">Login</button>
            </form>


  )
}
