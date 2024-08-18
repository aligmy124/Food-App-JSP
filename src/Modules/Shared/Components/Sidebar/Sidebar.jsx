import React, { useContext, useState } from 'react';
import { Sidebar as ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import togger from "../../../../assets/img/3.png";
import { AuthContext } from '../../../../Context/Authcontext';

export default function Sidebar() {
  let{loginData}=useContext(AuthContext)
  const [isCollapse, setisCollapse] = useState(false);
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
        <ProSidebar collapsed={isCollapse} className='side'>
          <button style={{border:"none",background:"none",margin:"auto"}}onClick={collapse}>
            <img src={togger} alt="togger" style={{width:isCollapse? "80px":"180px",transition:"0.3s"}}/>
          </button>
          <Menu>
            <MenuItem icon={<i className="fa-solid fa-house"></i>} component={<Link to="/dashboard" />}>Home</MenuItem>
             {loginData?.userGroup==="SuperAdmin"?
            <MenuItem icon={<i className="fa-solid fa-users"></i>} component={<Link to="/dashboard/UsersList" />}>Users</MenuItem>
             :
             ""
            }
            <MenuItem icon={<i className="fa-solid fa-credit-card"></i>} component={<Link to="/dashboard/RecipiesList" />}>Recipes</MenuItem>
            {loginData?.userGroup==="SuperAdmin"?
            <MenuItem icon={<i className="fa-solid fa-table-cells"></i>} component={<Link to="/dashboard/CategoriesList" />}>Categories</MenuItem>
            :
            ""
            }
            {loginData?.userGroup==="SystemUser"?
            <MenuItem icon={<i className="fa-solid fa-table-cells"></i>} component={<Link to="/dashboard/Favourite" />}>Faviourate</MenuItem>
            :
            ""
            }
            <MenuItem
            onClick={log_out}
            icon={<i className="fa-solid fa-right-from-bracket"></i>}>LogOut</MenuItem>
          </Menu>
        </ProSidebar>
      </div>
    </>
  );
}
