import React from "react";
import { motion } from "framer-motion";
import png1 from '../../assets/pngegg (2).png';
import png2 from '../../assets/pngegg (3).png';

const AboutSystem = () => {
  return (
    <section className="py-20 bg-white px-6 mb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10">
          
          {/* Left Image - Mobile এ উপরে থাকবে, Desktop এ বামে */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 flex justify-center"
          >
            <img 
              className="w-48 md:w-64 lg:w-full h-auto object-contain drop-shadow-2xl" 
              src={png1} 
              alt="Asset Management Illustration" 
            />
          </motion.div>

          {/* Center Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 text-center space-y-6"
          >
            <div className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary font-bold text-sm tracking-widest uppercase">
              Our Identity
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-primary leading-tight">
              What is <span className="text-secondary">AssetVerse?</span>
            </h2>

            <div className="relative">
              {/* Decorative Quote Mark */}
              <span className="absolute -top-6 -left-4 text-6xl text-gray-100 font-serif select-none">“</span>
              
              <p className="text-slate-600 leading-relaxed text-lg md:text-xl font-medium relative z-10">
                AssetVerse is a comprehensive digital platform that helps companies
                efficiently manage their physical assets <span className="text-primary font-bold">(laptops, keyboards, chairs, etc.)</span> and track which employee has which equipment. 
              </p>
              
              <p className="text-slate-500 leading-relaxed mt-4 text-base md:text-lg">
                It solves the common problem of companies losing track of valuable assets and
                streamlines the entire asset management process with precision and ease.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3 pt-6">
              {["Efficient", "Secure", "Real-time", "Scalable"].map((tag) => (
                <span key={tag} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-600 text-sm font-bold">
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Image - Desktop এ ডানে থাকবে */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 flex justify-center"
          >
            <img 
              className="w-48 md:w-64 lg:w-full h-auto object-contain drop-shadow-2xl transform lg:-scale-x-100" 
              src={png2} 
              alt="Equipment Tracking" 
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSystem;