import React from "react";
import office from "../../assets/corporate office.jpg";
import { FaArrowTrendUp } from "react-icons/fa6";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Banner = () => {
  const handleGetStarted = () => {
    Swal.fire({
      title: 'Welcome to AssetVerse!',
      text: 'Are you ready to manage your assets efficiently?',
      icon: 'info',
      confirmButtonText: 'Let\'s Go',
      confirmButtonColor: '#360185',
    });
  };

  return (
    <div className="relative w-full mt-6 px-4 sm:px-6 lg:px-8">
      <div className="relative w-full h-[500px] md:h-[650px] lg:h-[750px] overflow-hidden rounded-2xl shadow-2xl">
        
        <motion.img
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full object-cover brightness-50"
          src={office}
          alt="Corporate Office"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6 max-w-4xl"
          >
            AssetVerse helps companies <span className="text-secondary italic">effortlessly</span> track all assets
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-200 mb-10 max-w-2xl font-light"
          >
            Simplify management with real-time visibility and smart workflows built for teams of every size.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button 
              onClick={handleGetStarted}
              className="bg-primary hover:bg-secondary text-white font-bold px-8 py-4 rounded-full transition-all duration-300 flex items-center gap-3 shadow-lg shadow-primary/40 group"
            >
              Get Started 
              <FaArrowTrendUp className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </motion.div>

        </div>

        <div className="absolute bottom-10 left-10 hidden lg:block">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center font-bold">10k+</div>
                <p className="text-sm">Assets managed <br/> reliably every day.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;