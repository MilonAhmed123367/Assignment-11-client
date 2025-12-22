import React from "react";
import img from '../../assets/team-discussion.jpg';
import { motion } from "framer-motion";
import { FaCircleCheck } from "react-icons/fa6";

const Overview = () => {
  return (
    <div className="py-20 bg-white px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title with Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
            Project <span className="text-secondary">Overview</span>
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Image Section with Decorative Elements */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            {/* Decorative background box */}
            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-secondary/20 rounded-[2.5rem] hidden md:block"></div>
            
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl group">
              <img 
                className="w-full h-[400px] md:h-[500px] object-cover transform group-hover:scale-110 transition-transform duration-700" 
                src={img} 
                alt="Team Discussion" 
              />
              {/* Image Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-60"></div>
            </div>

            {/* Stats Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl hidden sm:flex items-center gap-4 border border-slate-50">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <FaCircleCheck size={24} />
                </div>
                <div>
                    <p className="font-bold text-slate-800 italic">B2B Focused</p>
                    <p className="text-xs text-slate-500">Industry Standard UI</p>
                </div>
            </div>
          </motion.div>

          {/* Text Content Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/5 border border-primary/10 text-primary font-bold text-sm tracking-widest uppercase">
              Core Concept
            </div>
            
            <h3 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-snug">
              A Scalable <span className="text-primary">HR & Asset</span> Management Ecosystem
            </h3>

            <div className="space-y-6">
              <p className="text-slate-600 text-lg leading-relaxed">
                This project is carefully crafted to evaluate not only your technical skills but also your <span className="font-semibold text-slate-900 underline decoration-secondary decoration-2 underline-offset-4">creativity and problem-solving capabilities</span>.
              </p>

              <div className="p-6 bg-slate-50 border-l-4 border-secondary rounded-r-2xl">
                <p className="text-slate-700 leading-relaxed italic">
                  "Through this task, we aim to gain insight into how you approach complex challenges, design efficient solutions, and deliver high-quality, maintainable code."
                </p>
              </div>

              <p className="text-slate-600 text-lg leading-relaxed">
                Your ability to think critically and implement best practices will be essential in showcasing your suitability for the role. This exercise reflects real-world scenarios where adaptability is key to success.
              </p>
            </div>

            {/* Key Features Minimal List */}
            <div className="grid grid-cols-2 gap-4 mt-8">
                {["Creativity", "Critical Thinking", "Efficiency", "Innovation"].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-700 font-medium">
                        <div className="w-2 h-2 rounded-full bg-secondary"></div>
                        {item}
                    </div>
                ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
};

export default Overview;