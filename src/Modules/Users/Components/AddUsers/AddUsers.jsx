import axios from 'axios'
import React, { useState , useEffect } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { USERS_URL } from '../../../../constant/Api'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify'
export default function AddUsers() {
    //token
    const token=localStorage.getItem("token")
  const nav=useNavigate()
    let{
        register, 
        handleSubmit,
        formState:{errors},
        }=useForm()

  //function get
  const[categoryList,setcategoryList]=useState([])
  const getUsersList= async ()=>{
  try {
    let res=await axios.get(USERS_URL.getUsers,{headers:{
      Authorization:`Bearer ${token}`
    }})
    setcategoryList(res.data.data)
    console.log(res.data.data)
  } catch (error) {
    console.log(error)
  }
}


// create
const createUser=async(data)=>{
  let recipyData=appendFormdata(data)
  try {
      let res=await axios.post(USERS_URL.create,recipyData,
      {headers:{
          Authorization:`Bearer ${token}`
      }})
      console.log(res)
      console.log(data)
      toast.success("Add successfully")
      
  } catch (error) {
      console.log(error)
      toast.error("Add not successfully")
      
  }
}


// const appendFormdata = (data) => {
//   const formData = new FormData();
//   formData.append("userName", data.userName);  
//   formData.append("email", data.email);  
//   formData.append("recipeImage", data.recipeImage[0]);
//   formData.append("phoneNumber", data.phoneNumber);  
//   formData.append("country", data.country);
//   formData.append("password", data.password);
//   formData.append("confirmPassword", data.confirmPassword );
//   return formData;
// }

const appendFormdata = (data) => {
  const formData = new FormData();
  formData.append("userName", data.userName);  
  formData.append("email", data.email);  
  formData.append("profileImage", data.profileImage[0]);  // تأكد من استخدام الاسم الصحيح
  formData.append("phoneNumber", data.phoneNumber);  
  formData.append("country", data.country);
  formData.append("password", data.password);
  formData.append("confirmPassword", data.confirmPassword);
  return formData;
}



useEffect(()=>{
  getUsersList()
  },[])
  
  return (
    <>
    <div style={{backgroundColor:"rgba(240, 255, 239, 1)"}} className="title mx-2 my-2 px-5 d-flex justify-content-between align-items-center">
      <div className="title-info">
        <h2 style={{color:"rgba(31, 38, 62, 1)",fontSize:"24px",fontWeight:"600"}}>Fill the <span className='text-success'>Users</span> !</h2>
        <p onClick={()=>nav()} style={{maxWidth:"440px",color:"rgba(31, 38, 62, 1)",fontSize:"16px"}}>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
      </div>
      <div className="btn">
        <button className='btn btn-success'>Fill Users <i className="fa-solid fa-arrow-right"></i></button>
      </div>
    </div>

    <form className='w-75 m-auto p-5'onSubmit={handleSubmit(createUser)}>
    <div className="my-2 ">
        <InputGroup>
        <Form.Control
          style={{backgroundColor:"rgba(217, 217, 217, 1)",height:"48px"}}
          type='text'
          placeholder="userName"
          aria-label="userName"
          aria-describedby="basic-addon1"
          {...register("userName",{
            required:"userName is required"
          })}
        />
      </InputGroup>
      {errors.userName &&<p className='text-danger'>{errors.userName.message}</p>}
    </div>

<div className="my-2">
        <InputGroup>
        <Form.Control
          style={{backgroundColor:"rgba(217, 217, 217, 1)",height:"48px"}}
          type='email'
          placeholder="email"
          aria-label="email"
          aria-describedby="basic-addon3"
          {...register("email",{
            required:"email is required"
          })}
        />
      </InputGroup>
      {errors.email&&<p className='text-danger'>{errors.email.message}</p>}
    </div>
<div className="my-2">
        <InputGroup>
        <Form.Control
          style={{backgroundColor:"rgba(217, 217, 217, 1)",height:"48px"}}
          type='text'
          placeholder="country"
          aria-label="country"
          aria-describedby="basic-addon3"
          {...register("country",{
            required:"country is required"
          })}
        />
      </InputGroup>
      {errors.country&&<p className='text-danger'>{errors.country.message}</p>}
    </div>
<div className="my-2">
        <InputGroup>
        <Form.Control
          style={{backgroundColor:"rgba(217, 217, 217, 1)",height:"48px"}}
          type='text'
          placeholder="phoneNumber"
          aria-label="phoneNumber"
          aria-describedby="basic-addon4"
          {...register("phoneNumber",{
            required:"phoneNumber is required"
          })}
        />
      </InputGroup>
      {errors.phoneNumber &&<p className='text-danger'>{errors.phoneNumber .message}</p>}
    </div>
<div className="my-2">
        <InputGroup>
        <Form.Control
          style={{backgroundColor:"rgba(217, 217, 217, 1)",height:"48px"}}
          type='password'
          placeholder="password"
          aria-label="password"
          aria-describedby="basic-addon5"
          {...register("password",{
            required:"password is required"
          })}
        />
      </InputGroup>
      {errors.password&&<p className='text-danger'>{errors.password.message}</p>}
    </div>
<div className="my-2">
        <InputGroup>
        <Form.Control
          style={{backgroundColor:"rgba(217, 217, 217, 1)",height:"48px"}}
          type='password'
          placeholder="confirmPassword"
          aria-label="confirmPassword"
          aria-describedby="basic-addon4"
          {...register("confirmPassword",{
            required:"confirmPassword is required"
          })}
        />
      </InputGroup>
      {errors.confirmPassword &&<p className='text-danger'>{errors.confirmPassword.message}</p>}
    </div>
      <Form.Group controlId="formFile" className="my-4" style={{ position: 'relative' }}>
        <Form.Label style={{
          display: 'block',
          padding: '10px',
          border: '2px dashed rgba(0, 128, 0, 0.5)',
          backgroundColor: 'rgba(217, 217, 217, 1)',
          borderRadius: '5px',
          textAlign: 'center',
          cursor: 'pointer',
          color: '#28a745',
          fontSize: '18px'
        }}>
          Drag & Drop or <span style={{ textDecoration: 'underline' }}>Choose a Item Image to Upload</span>
          <Form.Control type="file" {...register("profileImage", {
            required: "Image is required"
          })} style={{
            opacity: 0,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            cursor: 'pointer'
          }} />
        </Form.Label>
        {errors.profileImage && <p className='text-danger'>{errors.profileImage.message}</p>}
      </Form.Group>

    <div className="d-flex justify-content-end mt-4">
      <button onClick={()=>nav("/dashboard/UsersList")} type="button" className="btn btn-outline-success me-3">Cancel</button>
      <button type="submit" className="btn btn-success"onClick={()=>nav("/dashboard/UsersList")}>Save</button>
    </div>
    </form>
    </>
  )
}