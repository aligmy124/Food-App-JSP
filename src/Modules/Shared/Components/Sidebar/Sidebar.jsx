import React, { useContext, useState, useEffect } from 'react';
import { Sidebar as ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import togger from "../../../../assets/img/3.png";
import { AuthContext } from '../../../../Context/Authcontext';
import { Window } from '../../../../Window/WindowContext';
import { MenuContext } from '../../../../Window/MenueContext';

export default function Sidebar() {
    // Window
    
    const wind = useContext(Window);
    const size = wind.windowSize;

    // Menu
    const bar = useContext(MenuContext);
    const isOpen = bar.isOpen;

    let { loginData } = useContext(AuthContext);
    const [isCollapse, setIsCollapse] = useState(false);
    const [showIconsOnly, setShowIconsOnly] = useState(size <= 768);
    const nav = useNavigate();

    useEffect(() => {
        if (size <= 768) {
            setShowIconsOnly(true);
            setIsCollapse(true); // تصغير الـ sidebar
        } else {
            setShowIconsOnly(false);
            setIsCollapse(false); // توسيع الـ sidebar
        }
    }, [size]);

    const collapse = () => {
        setIsCollapse(!isCollapse);
    };

    const logOut = () => {
        localStorage.removeItem("token");
        nav("/login");
    };

    return (
        <>
            <div className="sidebarContainer">
                <ProSidebar 
                    collapsed={isCollapse}
                    className='side'
                >
                    <button 
                        style={{ border: "none", background: "none", margin: "auto" }}
                        onClick={collapse}
                    >
                        <img 
                            src={togger} 
                            alt="togger" 
                            style={{ width: isCollapse ?  "80px" : "180px", transition: "0.3s" }} 
                        />
                    </button>
                    <Menu>
                        <MenuItem icon={ <i className="fa-solid fa-house"></i>} component={<Link to="/dashboard" />}>
                            { !showIconsOnly && <span className="menu-item-text">Home</span> }
                        </MenuItem>
                        {loginData?.userGroup === "SuperAdmin" ?
                            <MenuItem icon={<i className="fa-solid fa-users"></i>} component={<Link to="/dashboard/UsersList" />}>
                                { !showIconsOnly && <span className="menu-item-text">Users</span> }
                            </MenuItem>
                            : null
                        }
                        <MenuItem icon={<i className="fa-solid fa-credit-card"></i>} component={<Link to="/dashboard/RecipiesList" />}>
                            { !showIconsOnly && <span className="menu-item-text">Recipes</span> }
                        </MenuItem>
                        {loginData?.userGroup === "SuperAdmin" ?
                            <MenuItem icon={<i className="fa-solid fa-table-cells"></i>} component={<Link to="/dashboard/CategoriesList" />}>
                                { !showIconsOnly && <span className="menu-item-text">Categories</span> }
                            </MenuItem>
                            : null
                        }
                        {loginData?.userGroup === "SystemUser" ?
                            <MenuItem icon={<i className="fa-solid fa-table-cells"></i>} component={<Link to="/dashboard/Favourite" />}>
                                { !showIconsOnly && <span className="menu-item-text">Favourites</span> }
                            </MenuItem>
                            : null
                        }
                        <MenuItem
                            onClick={logOut}
                            icon={<i className="fa-solid fa-right-from-bracket"></i>}
                        >
                            { !showIconsOnly && <span className="menu-item-text">LogOut</span> }
                        </MenuItem>
                    </Menu>
                </ProSidebar>
            </div>
        </>
    );
}
