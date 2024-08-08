import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import logo from '../../../../assets/img/4 3.png'
import { useForm } from 'react-hook-form';
import {toast } from 'react-toastify';
import axios from 'axios';
import { USERS_URL } from '../../../../constant/Api';
import styles from "../../auth.module.css";
import { email_valid, password_valid } from '../../../../constant/Validation';
export default function Resetpass() {
  let{
    register,
    handleSubmit,
    watch,
    formState:{errors,isSubmitting},
  }=useForm({mode:"onBlur"})

  let submit=async (data)=>{
    try{
      let res=await axios.post(USERS_URL.resetpass,data)
      toast.success("Password has been updated successfully")
    }
    catch(err){
      toast.error(err.response.data.message)
    }
  }


  return (
  <form onSubmit={handleSubmit(submit)}>
          <div className={styles["form-reset"]}>
          <h3> Reset  Password</h3>
          <p>Please Enter Your Otp  or Check Your Inbox</p>
        </div>
     <div className="mb-2 mt-3">
     <InputGroup>
        <InputGroup.Text id="basic-addon1"><i className="fa-solid fa-envelope"></i></InputGroup.Text>
        <Form.Control
          style={{height:"56px"}}
          type="email"
          placeholder="Enter Your E-mail"
          aria-label="email"
          aria-describedby="basic-addon1"
          {...register("email",email_valid)}
        />        
      </InputGroup>
      {errors.email&&<p className='text-danger'>{errors.email.message}</p>}

</div>
<div className="mb-2">
     <InputGroup>
        <InputGroup.Text id="basic-addon2"><i className="fa-solid fa-lock"></i></InputGroup.Text>
        <Form.Control
          style={{height:"56px"}}
          type="text"
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

</div>
<div className="mb-2">
     <InputGroup>
        <InputGroup.Text id="basic-addon3"><i className="fa-solid fa-lock"></i></InputGroup.Text>
        <Form.Control
          style={{height:"56px"}}
          type="password"
          placeholder="New password"
          aria-label="password"
          aria-describedby="basic-addon3"
          {...register("password",password_valid)}
        />       
      </InputGroup>
      {errors.password && <p className='text-danger'>{errors.password.message}</p>}

</div>



<div className="mb-2">
<InputGroup>
        <InputGroup.Text id="basic-addon4"><i className="fa-solid fa-lock"></i></InputGroup.Text>
        <Form.Control
          style={{height:"56px"}}
          type='password'
          placeholder="Confirm new password"
          aria-label="confirmPassword"
          aria-describedby="basic-addon4"
          {...register("confirmPassword",{
            required:"confirm Password is required",
            validate:(value)=>value===watch("password")||"password dont match",
          })}
        />        
      </InputGroup>
</div>

      {errors.confirmPassword && <p className='text-danger'>{errors.confirmPassword.message}</p>}

      <button type='submit' className="btn btn-success d-block w-100 my-4 fs-5" disabled={isSubmitting}>Reset Password</button>

  </form>

  )
}
