import React, { useState } from 'react';
import { Sidebar as ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import togger from "../../../../assets/img/3.png";

export default function Sidebar() {
  const [isCollapse, setisCollapse] = useState(false);
  const [issize, setissize] = useState("915px");
  const nav=useNavigate()
  const collapse = () => {
    setisCollapse(!isCollapse);
  };

  const log_out=()=>{
    localStorage.removeItem("token")
    nav("/login")
  }

  return (
    <>
      <div className="sidebarContainer">
        <ProSidebar  collapsed={isCollapse}>
          <button style={{border:"none",background:"none",margin:"auto"}}onClick={collapse}>
            <img src={togger} alt="togger" style={{width:isCollapse? "80px":"180px"}}/>
          </button>
          <Menu>
            <MenuItem icon={<i className="fa-solid fa-house"></i>} component={<Link to="/dashboard" />}>Home</MenuItem>
            <MenuItem icon={<i className="fa-solid fa-users"></i>} component={<Link to="/dashboard/UsersList" />}>Users</MenuItem>
            <MenuItem icon={<i className="fa-solid fa-credit-card"></i>} component={<Link to="/dashboard/RecipiesList" />}>Recipes</MenuItem>
            <MenuItem icon={<i className="fa-solid fa-table-cells"></i>} component={<Link to="/dashboard/CategoriesList" />}>Categories</MenuItem>
            <MenuItem
            onClick={log_out}
            icon={<i className="fa-solid fa-right-from-bracket"></i>}>LogOut</MenuItem>
          </Menu>
        </ProSidebar>
      </div>
    </>
  );
}
