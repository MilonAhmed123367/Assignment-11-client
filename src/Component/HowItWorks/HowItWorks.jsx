import React from "react";
import { motion } from "framer-motion";
import { FaUserTie, FaUsers, FaBoxOpen, FaGlobe } from "react-icons/fa6";

const HowItWorks = () => {
  const steps = [
    {
      title: "HR Managers Register",
      desc: "Register your company and get a default subscription package for 5 employees to start managing assets.",
      icon: <FaUserTie className="text-3xl" />,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Employee Affiliation",
      desc: "Employees register independently and are automatically linked to their correct company via email domain.",
      icon: <FaUsers className="text-3xl" />,
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "Smart Asset Tracking",
      desc: "A complete lifecycle management: from Inventory entry to Assignment and seamless Returns.",
      icon: <FaBoxOpen className="text-3xl" />,
      color: "from-orange-500 to-red-600",
    },
    {
      title: "Multi-Company Support",
      desc: "Versatile architecture allows employees to collaborate with multiple companies through a single dashboard.",
      icon: <FaGlobe className="text-3xl" />,
      color: "from-green-500 to-teal-600",
    },
  ];

  return (
    <section className="py-20 px-6 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-primary mb-4"
          >
            How the System <span className="text-secondary">Works</span>
          </motion.h2>
          <div className="w-24 h-1.5 bg-secondary mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-500 max-w-2xl mx-auto text-lg">
            Our streamlined process ensures your asset management is efficient, transparent, and scalable.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center text-center relative group overflow-hidden"
            >
              {/* Animated Background Blur on Hover */}
              <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${step.color} opacity-5 group-hover:opacity-10 rounded-full transition-all duration-500`}></div>

              {/* Icon Container */}
              <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform`}>
                {step.icon}
              </div>

              {/* Step Number */}
              <span className="absolute top-6 right-8 text-6xl font-black text-gray-50 opacity-10 group-hover:opacity-20 transition-opacity">
                0{i + 1}
              </span>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-800 mb-4 relative z-10">
                {step.title}
              </h3>
              <p className="text-gray-500 leading-relaxed relative z-10">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;