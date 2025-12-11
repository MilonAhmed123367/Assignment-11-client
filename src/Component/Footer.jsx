import React from 'react';
import Logo from './Logo';
import { FaFacebook, FaInstagram, FaPhoneSquareAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { PiLinkedinLogo } from 'react-icons/pi';
import { RiFacebookBoxLine } from 'react-icons/ri';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (

    <div>

      <footer className="footer sm:footer-horizontal bg-gray-50 p-10 rounded-2xl">
        <div>
          <Logo></Logo>
          <p className="font-semibold text-xl flex gap-2 items-center">
            <MdEmail /> support@assetverse.com
          </p>
          <p className="font-semibold text-xl flex gap-2 items-center">
            <FaPhoneSquareAlt /> +880 XXXXXXXX
          </p>
        </div>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <div className="grid grid-flow-col gap-4">
              <a className='text-4xl' href="/"><RiFacebookBoxLine /></a>
              <a className='text-4xl' href="/"><PiLinkedinLogo /></a>
              <a className='text-4xl' href="/"><FaXTwitter /></a>
              <a className='text-4xl' href="/"><FaInstagram /></a>
            </div>
          </div>
        </nav>

      </footer>
      <p className='text-center bg-gray-50 mb-5'>© 2025 AssetVerse. All rights reserved.</p>
    </div>
    // <div className="footer footer-horizontal footer-center bg-gray-300 p-10 mt-10 rounded-2xl ">
    //   <aside>
    //     <Logo></Logo>
    //     <p className="font-semibold text-2xl flex gap-2 items-center">
    //       <MdEmail /> support@assetverse.com
    //     </p>
    //     <p className="font-semibold text-2xl flex gap-2 items-center">
    //       <FaPhoneSquareAlt /> +880 XXXXXXXX
    //     </p>
    //   </aside>

    //   <nav>
    //     <div className="grid grid-flow-col gap-4">
    //       <a className='text-4xl' href="/"><RiFacebookBoxLine /></a>
    //       <a className='text-4xl' href="/"><PiLinkedinLogo /></a>
    //       <a className='text-4xl' href="/"><FaXTwitter /></a>
    //       <a className='text-4xl' href="/"><FaInstagram /></a>
    //     </div>
    //   </nav>
    //   
    // </div>
  );
};

export default Footer;