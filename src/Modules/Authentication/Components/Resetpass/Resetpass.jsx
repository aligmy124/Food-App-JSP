import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import logo from '../../../../assets/img/4 3.png'
import { useForm } from 'react-hook-form';
import {toast } from 'react-toastify';
import axios from 'axios';
export default function Resetpass() {


  let{
    register,
    handleSubmit,
    formState:{errors},
  }=useForm()

  let submit=async (data)=>{
    try{
      let res=await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset",data)
      toast.success("Password has been updated successfully")
    }
    catch(err){
      toast.error("The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long.")
      toast.error("The confirmPassword and password fields must match.")
    }
  }


  return (
    <div>
      <div className="auth-container">
        <div className="row vh-100 justify-content-center align-items-center bg-overlay ">
          <div className="col-md-5  bg-white py-4 rounded rounded-2">
            <div className="content px-5 ">
              <div className="img text-center">
                <img src={logo} alt="logo" className='w-50' />
              </div>
              <div className="title py-4">
              <h2 className='text-capitalize ' style={{fontWeight:"700",color:"rgba(73, 73, 73, 0.9)"}}>Reset Your Password?</h2>
              <p style={{color:"rgba(73, 73, 73, 0.6)"}}>Please Enter Your Otp  or Check Your Inbox </p>
            </div>
            <form onSubmit={handleSubmit(submit)}>
            <InputGroup className="mb-4">
        <InputGroup.Text id="basic-addon1"><i className="fa-solid fa-envelope"></i></InputGroup.Text>
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

      {errors.email&&<p className='text-danger'>{errors.email.message}</p>}

      <InputGroup className="mb-4">
        <InputGroup.Text id="basic-addon2"><i className="fa-solid fa-lock"></i></InputGroup.Text>
        <Form.Control
          placeholder="OTP"
          aria-label="text"
          aria-describedby="basic-addon2"
          {...register("seed",{
            required:"OTP is required",
            pattern:{
              message:"Enter a valid OTP"
            }
          })}
        />       
      </InputGroup>

      {errors.seed && <p className='text-danger'>{errors.seed.message}</p>}


        <InputGroup className="mb-4">
        <InputGroup.Text id="basic-addon3"><i className="fa-solid fa-lock"></i></InputGroup.Text>
        <Form.Control
          placeholder="New Password"
          aria-label="password"
          aria-describedby="basic-addon3"
          {...register("password",{
            required:"password is required",
            pattern:{
              message:"The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long."
            }
          })}
        />        
      </InputGroup>
      {errors.Password && <p className='text-danger'>{errors.Password.message}</p>}

            <InputGroup className="mb-4">
        <InputGroup.Text id="basic-addon4"><i className="fa-solid fa-lock"></i></InputGroup.Text>
        <Form.Control
          placeholder="Confirm new password"
          aria-label="confirmPassword"
          aria-describedby="basic-addon4"
          {...register("confirmPassword",{
            required:"confirm Password is required",
            pattern:{
              message:"The confirmPassword and password fields must match."
            }
          })}
        />        
      </InputGroup>

      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

      <button type='submit' className="btn btn-success d-block w-100 my-4 fs-4">Reset Password</button>

            </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
