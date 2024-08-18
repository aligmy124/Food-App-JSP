import React from 'react';
import './header.css';

export default function Header({ title, description, imgUrl, type, name, add }) {
  return (
    <>
      <div className='headerContainer mx-2 my-3 p-5' style={{ overflow: "hidden" }}>
        <div className="row align-items-center">
          <div className="col-12 col-md-6 mb-3 mb-md-0">
            <div className="title">
              <h2 style={{ fontSize: "40px", fontWeight: "700", color: "rgba(255, 255, 255, 1)" }}>
                {title}
              </h2>
              <p style={{ color: "rgba(255, 255, 255, 1)", fontSize: "16px", maxWidth: "430px", fontWeight: "400", lineHeight: "24px" }}>
                {description}
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end">
            <div className="img">
              <img src={imgUrl} alt={type} className='img-fluid' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
