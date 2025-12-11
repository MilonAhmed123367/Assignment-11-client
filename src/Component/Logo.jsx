import React from 'react';
import logo from '../assets/logo.jpg'
import { NavLink } from 'react-router';


const Logo = () => {
  return (
    <NavLink to='/'>
      <div className='flex items-center'>
        <img className='w-15' src={logo} alt="Logo" />
        <h1 className='bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text text-3xl font-bold'> AssetVerse</h1>
      </div>
    </NavLink>
  );
};

export default Logo;