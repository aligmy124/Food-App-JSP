import axios from 'axios';
import React from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useForm } from 'react-hook-form';
import { USERS_URL } from '../../../../constant/Api';
import { email_valid } from '../../../../constant/Validation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function Verfiy_register() {
    //token
    const token=localStorage.getItem("token")
    //nav
    const nav=useNavigate()
    let{
        register,
        handleSubmit,
        formState:{errors},
    }=useForm()

    const Verify_register=async(data)=>{
        try {
            let res=await axios.put(USERS_URL.verify,data,{headers:{
                Authorization:  `Bearer ${token}`
            }})
            console.log(res)
            toast.success("verify fuccessfully")
            nav("/login")
        } catch (error) {
            console.log(error)
            toast.error("verify not fuccessfully")
        }
    }
  return (
    <>
    <form onSubmit={handleSubmit(Verify_register)}>
        <div className="title">
            <div className="title-info">
            <h3>Verfiy Register</h3>
            <p>Welcome back! please enter your details</p>
            </div>
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
          {...register("email", email_valid)}
        />        
      </InputGroup>
      {errors.email && <p>{errors.email.message}</p>}

      </div>
      <div className="mb-1">
    <InputGroup>
        <InputGroup.Text id="basic-addon2"><i className="fa-solid fa-key"></i></InputGroup.Text>
        <Form.Control
          type="text"
          style={{height:"56px"}}
          placeholder="Enter Your code"
          aria-label="code"
          aria-describedby="basic-addon2"
          {...register("code",{
            required:"code is required"
          })}
        />
      </InputGroup>
      {errors.code&&<p className='text-danger'>{errors.code.message}</p>}
    </div>
    <button type="submit" className="btn btn-success d-block w-100 my-3">Verfiy</button>

    </form>
    </>
  )
}
