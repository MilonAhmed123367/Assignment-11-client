import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const Packages = () => {
  const plans = [
    { name: "Starter", price: "$5", members: "5 Employees", color: "border-slate-200" },
    { name: "Growth", price: "$8", members: "10 Employees", color: "border-primary" },
    { name: "Pro", price: "$15", members: "20 Employees", color: "border-slate-200" },
  ];

  return (
    <div className="py-20 bg-[#f8fafc] px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-black text-center text-primary mb-16">
          Affordable <span className="text-secondary">Packages</span>
        </h2>

        {/* Grid Layout with equal sizing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className={`bg-white p-8 rounded-[2rem] border-2 ${plan.color} shadow-sm flex flex-col justify-between h-full`}
            >
              <div>
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="text-4xl font-black text-primary mb-6">
                  {plan.price}<span className="text-lg text-gray-400 font-medium">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-2 text-gray-600">
                    <FaCheckCircle className="text-secondary" /> {plan.members}
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <FaCheckCircle className="text-secondary" /> Full Asset Tracking
                  </li>
                </ul>
              </div>

              {/* Consistent Button Style */}
              <button className="w-full bg-primary hover:bg-secondary text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20">
                Purchase Plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Packages;