import React from "react";
import { motion } from "framer-motion";
import { FaShieldHalved, FaArrowRotateRight, FaMagnifyingGlassChart, FaUserClock, FaBoxArchive } from "react-icons/fa6";

const WhyBuild = () => {
  const points = [
    {
      text: "Prevents asset loss and improves accountability",
      icon: <FaShieldHalved />,
      desc: "Protect company property with a digital audit trail."
    },
    {
      text: "Streamlines asset assignment and return",
      icon: <FaArrowRotateRight />,
      desc: "Fast-track the workflow between HR and employees."
    },
    {
      text: "Clear visibility into inventory",
      icon: <FaMagnifyingGlassChart />,
      desc: "Real-time updates on what's available and what's in use."
    },
    {
      text: "Reduces administrative overhead",
      icon: <FaUserClock />,
      desc: "Minimize manual paperwork and save time for HR teams."
    },
    {
      text: "Tracking Returnable vs Non-returnable",
      icon: <FaBoxArchive />,
      desc: "Differentiate items easily to manage stock efficiently."
    },
  ];

  return (
    <div className="py-24 px-6 bg-[#f8fafc] mb-16 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-6">
            Why Build <span className="text-secondary">This System?</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
            AssetVerse brings powerful efficiency and accountability to HR and asset management workflows — saving time and preventing loss.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 group transition-all hover:shadow-xl hover:border-primary/20"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 bg-primary/5 text-primary rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {p.icon}
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-extrabold text-slate-800 mb-3">
                {p.text}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                {p.desc}
              </p>
              
              {/* Bottom Subtle Bar */}
              <div className="mt-6 w-10 h-1 bg-secondary/20 rounded-full group-hover:w-full transition-all duration-500"></div>
            </motion.div>
          ))}
          
          {/* Last CTA Card (Unique Design Touch) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-primary to-secondary p-8 rounded-[2.5rem] text-white flex flex-col justify-center items-center text-center"
          >
            <h3 className="text-2xl font-bold mb-2">Ready to Start?</h3>
            <p className="text-white/80 text-sm mb-6">Experience the best asset tracking tool today.</p>
            <button className="bg-white text-primary font-bold px-6 py-2 rounded-full hover:bg-slate-100 transition-colors">
              Explore Now
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WhyBuild;