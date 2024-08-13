import React from 'react'
import './header.css';
export default function Header({title,description,imgUrl,type,name,add}) {
  return (
    <>
    <div className='headerContainer mx-2 my-3 p-5 'style={{overflow:"hidden"}}>
        <div className="row align-items-center fluid">
            <div className="col-12 col-md-6 ">
                <div className="title ">
                    <h2  style={{fontSize:"40px",fontWeight:"700",color:"rgba(255, 255, 255, 1)"}}>{title}</h2>
                    <p style={{color:" rgba(255, 255, 255, 1)",fontSize:"16px",maxWidth:"430px",fontWeight:"400",lineHeight:"24px"}}>{description}</p>
                </div>
            </div>
            <div className="col-12 col-md-6 d-flex justify-content-end">
                <div className="img">
                   <img src={imgUrl} alt={type} className='img-fluid'/>
                </div>
            </div>
        </div>
    </div>
    {/* {name && add && (
        <div className="title d-flex justify-content-between px-3">
          <div className="title-info">
            <h2>{name} Table Details</h2>
            <p>You can check all details</p>
          </div>
          <div className="btn">
            <button className='btn btn-success'>Add New {add}</button>
          </div>
        </div>
      )} */}
    </>
  )
}
