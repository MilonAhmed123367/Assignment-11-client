import React from 'react';
import Logo from '../Component/Logo';
import { Outlet } from 'react-router';
import LoginPng from '../assets/Login-PNG-Photo.png'


const AuthLayout = () => {
  return (
    <div>
      <Logo></Logo>
      <div className='flex'>
        <div className='flex-1'>
          <Outlet></Outlet>
        </div>
        <div className='flex-1'>
            <img src={LoginPng} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;