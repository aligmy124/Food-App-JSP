import React, { useContext } from 'react';
import './nav.css';
import username from '../../../../assets/img/Username.png';
import { AuthContext } from '../../../../Context/Authcontext';
import logo from '../../../../assets/img/4 3.png';
import { MenuContext } from '../../../../Window/MenueContext';

export default function Navbar() {
  let { loginData } = useContext(AuthContext);

  //Menue
  const bar =useContext(MenuContext);
  const change=bar.setIsOpen
  console.log(change);
  



  return (
    <nav className="navbar navbar-expand-lg navbar-light mt-1" style={{ height: '68px' }}>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse mx-3 my-5 " id="navbarSupportedContent">
        <div className="branding">
          <img src={logo} alt="Brand Logo"width={"180px"} onClick={()=>change(prev=>!prev)}/>
        </div>
        <ul className="navbar-nav ">
          <li className="nav-item ms-1 active">
            <img src={username} alt="username" />
            <h6>{loginData?.userName}</h6>
          </li>
        </ul>
      </div>
    </nav>
  );
}
