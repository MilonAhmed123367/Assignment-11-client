import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../Component/NavBar';
import Footer from '../Component/Footer';

const RootLayout = () => {
    return (
        <div className='max-w-[1700px] mx-auto'>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;