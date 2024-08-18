import React, { useContext } from 'react'
import "./nav.css"
import username from '../../../../assets/img/Username.png'
import { AuthContext } from '../../../../Context/Authcontext'
export default function Navbar() {
  let {loginData}=useContext(AuthContext)
  return (
  <nav className="navbar navbar-expand-lg navbar-light mt-4" style={{height:"68px"}}>
     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  
<div className="collapse navbar-collapse mx-3" id="navbarSupportedContent">
<form className="form-inline w-50">
  <input className="form-control mr-sm-2" style={{height:"40px"}} type="search" placeholder="Search" aria-label="Search" />
</form>
    <ul className="navbar-nav m-auto">
      <li className="nav-item ms-1 active">
        <img src={username} alt="username" />
        <h6 style={{display:"inline-block",margin:"0 8px",fontSize:"12px",fontWeight:"500",color:"rgba(31, 56, 76, 1)"}}>{loginData?.userName}</h6>
      </li>
      <li className="nav-item mx-4">
      <a className="nav-link" href="#"><i className="fa-solid fa-angle-down"></i></a>
      </li>
      <li className="nav-item ms-2">
      <a className="nav-link" href="#"><i className="fa-solid fa-bell"></i></a>
      </li>
    </ul>
  </div>
  </nav>
  )
}
