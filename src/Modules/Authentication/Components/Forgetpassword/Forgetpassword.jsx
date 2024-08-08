import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import bike from '../../../../assets/img/bike3 3.png'
import { useForm } from 'react-hook-form';
import {toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from "../../auth.module.css";
import { USERS_URL } from '../../../../constant/Api';
import { email_valid } from '../../../../constant/Validation';

export default function Forgetpassword() {


  let navigate=useNavigate()

  let{
    register,
    handleSubmit,
    formState:{errors},
  }=useForm()

  let submit=async (data)=>{
    try{
      let res=await axios.post(USERS_URL.forgetpass,data)
      navigate("/reset-password")
      toast.success("check your password")
    }
    catch(err){
      if(err.response.status===404){
        toast.error(err?.response?.data?.message)
      }
    }
  }



  return (
     <form onSubmit={handleSubmit(submit)}>
        <div className={styles["form-auth"]}>
          <h3>Forgot Your Password</h3>
          <p>No worries! Please enter your email and we will send a password reset link </p>
        </div>
        <InputGroup className="mt-5">
        <InputGroup.Text id="basic-addon1"><i className="fa-solid fa-mobile-screen-button"></i></InputGroup.Text>
        <Form.Control
          placeholder="Enter Your E-mail"
          aria-label="email"
          aria-describedby="basic-addon1"
          {...register("email",email_valid)}
        />        
      </InputGroup>
      {errors.email&&<p className='text-danger mt-1'>{errors.email.message}</p>}
      <div className="img-bike">
        <img src={bike} alt="bike" width={"100px"}height={"96px"} />
      </div>

      <button type='submit' className="btn btn-success d-block w-100 mb-5 fs-4">submit</button>

    </form>

  )
}
