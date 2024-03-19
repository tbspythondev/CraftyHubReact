import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='app-layout m-0 h-100'>
      <div className='app-navbar'>
        <Navbar />
      </div>
      <div className='app-component p-0'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
