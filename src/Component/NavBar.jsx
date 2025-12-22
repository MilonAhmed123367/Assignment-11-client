import React from 'react';
import Logo from './Logo';
import { NavLink } from 'react-router';
import useAuth from '../hooks/useAuth';
import { motion } from 'framer-motion';

const NavBar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch(error => console.log(error));
  };

  const links = (
    <>
      <li className="relative group">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 text-sm lg:text-base font-bold transition-all duration-300 ${
              isActive ? "text-primary" : "text-gray-500 hover:text-primary"
            }`
          }
          end
        >
          Home
          <span className="absolute bottom-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
        </NavLink>
      </li>

      {!user && (
        <>
          <li className="relative group">
            <NavLink
              to="/JoinEmployee"
              className={({ isActive }) =>
                `px-4 py-2 text-sm lg:text-base font-bold transition-all duration-300 ${
                  isActive ? "text-primary" : "text-gray-500 hover:text-primary"
                }`
              }
            >
              Join as Employee
            </NavLink>
          </li>
          <li className="relative group">
            <NavLink
              to="/JoinManager"
              className={({ isActive }) =>
                `px-4 py-2 text-sm lg:text-base font-bold transition-all duration-300 ${
                  isActive ? "text-primary" : "text-gray-500 hover:text-primary"
                }`
              }
            >
              Join as HR Manager
            </NavLink>
          </li>
        </>
      )}

      <li className="relative group">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `px-4 py-2 text-sm lg:text-base font-bold transition-all duration-300 ${
              isActive ? "text-primary" : "text-gray-500 hover:text-primary"
            }`
          }
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        
        {/* Start: Logo and Mobile Menu */}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-xl bg-white rounded-2xl w-64 space-y-2"
            >
              {links}
            </ul>
          </div>
          <div className="hover:opacity-80 transition-opacity">
            <Logo />
          </div>
        </div>

        {/* Center: Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            {links}
          </ul>
        </div>

        {/* End: Auth Button */}
        <div className="navbar-end gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden md:block text-right">
                <p className="text-xs font-bold text-gray-900 leading-none">{user?.displayName}</p>
                <p className="text-[10px] text-gray-400">Authorized User</p>
              </div>
              <button 
                onClick={handleLogOut} 
                className="btn min-h-0 h-11 px-6 bg-secondary hover:bg-primary text-white border-none rounded-xl font-bold transition-all duration-300 shadow-lg shadow-secondary/20"
              >
                Log Out
              </button>
            </div>
          ) : (
            <NavLink 
              to="/login" 
              className="btn min-h-0 h-11 px-8 bg-primary hover:bg-secondary text-white border-none rounded-xl font-bold transition-all duration-300 shadow-lg shadow-primary/20"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;