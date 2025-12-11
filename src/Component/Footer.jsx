import React from 'react';
import Logo from './Logo';
import { FaFacebook, FaInstagram, FaPhoneSquareAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { PiLinkedinLogo } from 'react-icons/pi';
import { RiFacebookBoxLine } from 'react-icons/ri';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-gray-300 p-10 mt-10 rounded-2xl ">
      <aside>
        <Logo></Logo>
        <p className="font-semibold text-2xl flex gap-2 items-center">
          <MdEmail /> support@assetverse.com
        </p>
        <p className="font-semibold text-2xl flex gap-2 items-center">
          <FaPhoneSquareAlt /> +880 XXXXXXXX
        </p>
      </aside>

      <nav>
        <div className="grid grid-flow-col gap-4">
          <a className='text-4xl' href="/"><RiFacebookBoxLine /></a>
          <a className='text-4xl' href="/"><PiLinkedinLogo /></a>
          <a className='text-4xl' href="/"><FaXTwitter /></a>
          <a className='text-4xl' href="/"><FaInstagram /></a>
        </div>
      </nav>
      <p>© 2025 AssetVerse. All rights reserved.</p>
    </footer>
  );
};

export default Footer;