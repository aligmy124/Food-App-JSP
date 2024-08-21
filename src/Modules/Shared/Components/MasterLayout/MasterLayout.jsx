import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';

export default function MasterLayout() {
  return (
    <>
      <div className="d-flex">
        <div className="sidebar-fixed">
          <Sidebar/>
        </div>
        <div className="content-container">
          <div className="navbar-fixed">
            <Navbar/>
          </div>
          <div className="content">
            <Outlet/>
          </div>
        </div>
      </div>
    </>
  );
}
