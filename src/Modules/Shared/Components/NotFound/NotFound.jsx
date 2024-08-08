import React from 'react'
import "./Notfound.css"
import logo from '../../../../assets/img/4 3.png'
import Notfound from '../../../../assets/img/notFound-1.png'
import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div className="notFound">
      <div className="brand  mt-4 ms-5">
        <img src={logo} alt="logo" width={"366px"}/>
      </div>
      <div className="row" style={{marginLeft:"105px",marginTop:"150px"}}>
        <div className="col-md-5">
          <div className="title">
            <h2 style={{color:"rgba(31, 38, 62, 1)",fontWeight:"700",fontSize:"40px"}}>Oops.... </h2>
            <p style={{fontSize:"32px",color:"rgba(0, 146, 71, 1)"}}>Page  not found </p>
            <p style={{fontSize:"16px",fontWeight:"400",color:"rgba(31, 38, 62, 1)",width:"418.12px",marginBottom:"66px"}}>This Page doesn’t exist or was removed!
            We suggest you  back to home.</p>
          </div>
          <div className="btn">
            <Link to="" style={{backgroundColor:"rgba(0, 146, 71, 1)",padding:"15px 60px",color:"#fff",textDecorationLine:"none",borderRadius:"10px"}}><i className="fa-solid fa-arrow-left m-0"></i> back to home</Link>
          </div>
        </div>
        <div className="col-md-5">
        <div className="img position-absolute bottom-0">
            <img src={Notfound} alt="" className='img-fluid position-absoluate buttom-3'  />
          </div>
        </div>
      </div>

      </div>
      

  )
}
