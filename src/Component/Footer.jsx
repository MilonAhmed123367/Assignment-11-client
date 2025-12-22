import React from 'react';
import Logo from './Logo';
import { FaInstagram, FaPhoneSquareAlt } from 'react-icons/fa';
import { MdEmail, MdLocationOn } from 'react-icons/md';
import { PiLinkedinLogo } from 'react-icons/pi';
import { RiFacebookBoxFill } from 'react-icons/ri';
import { FaXTwitter } from 'react-icons/fa6'; // Latest X logo

const Footer = () => {
  return (
    <footer className="mt-20">
      <div className="bg-white border-t border-gray-100 pt-16 pb-8 px-6 rounded-t-[3rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Brand Section */}
            <div className="space-y-6">
              <Logo />
              <p className="text-gray-500 text-sm leading-relaxed">
                Empowering businesses with smart asset tracking and HR management solutions. Efficiency starts here.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all duration-300 shadow-sm">
                  <RiFacebookBoxFill size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all duration-300 shadow-sm">
                  <PiLinkedinLogo size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all duration-300 shadow-sm">
                  <FaXTwitter size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-gray-600 hover:bg-gradient-to-tr hover:from-orange-500 hover:to-purple-600 hover:text-white transition-all duration-300 shadow-sm">
                  <FaInstagram size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Navigation</h4>
              <ul className="space-y-4 text-gray-500 font-medium text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">About System</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Packages</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Join as Manager</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Contact Support</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-500 group">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <MdEmail size={18} />
                  </div>
                  <span className="text-sm font-medium">support@assetverse.com</span>
                </li>
                <li className="flex items-center gap-3 text-gray-500 group">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <FaPhoneSquareAlt size={18} />
                  </div>
                  <span className="text-sm font-medium">+880 1234-567890</span>
                </li>
              </ul>
            </div>

            {/* Newsletter/Small CTA */}
            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Location</h4>
              <p className="flex items-start gap-2 text-gray-500 text-sm leading-relaxed">
                <MdLocationOn className="text-secondary mt-1" size={20} />
                Level 4, Digital Tower, <br />
                Kushtia, Khulna, Bangladesh.
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm font-medium">
              © 2025 <span className="text-primary font-bold">AssetVerse</span>. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;