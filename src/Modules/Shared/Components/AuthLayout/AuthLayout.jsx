import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import logo from '../../../../assets/img/4 3.png'

export default function AuthLayout() {
  const nav=useNavigate()
  useEffect(()=>{
    if(localStorage.getItem("token")){
      nav("/dashboard")
    }
  },[])
  return (
<div className="auth-container">
      <div className="row  vh-100 justify-content-center align-items-center bg-overlay">
        <div className=" col-md-5 bg-white py-4 rounded rounded-2">
          <div className='px-5'>
            <div className="text-center img mb-3">
            <img src={logo} alt="login"  className='w-50 img-fluid'/>
            </div>
            <Outlet/>
            </div>
        </div>
      </div>
    </div>

  )
}
