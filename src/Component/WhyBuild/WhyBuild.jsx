import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const WhyBuild = () => {
  const points = [
    "Prevents asset loss and improves accountability",
    "Streamlines asset assignment and return processes",
    "Provides clear visibility into the company asset inventory",
    "Reduces administrative overhead for HR departments",
    "Ensures proper tracking of returnable vs non-returnable items",
  ];

  return (
    <div className="py-16 px-6 bg-gray-50 mb-10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text">
          Why Build This System?
        </h2>

        <p className="text-lg text-gray-600 mb-12">
          This system brings powerful efficiency, better tracking, and accountability
          to both HR and asset management workflows — saving time and preventing loss.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {points.map((p, i) => (
            <div
              key={i}
              className="flex items-start bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="text-primary text-2xl mr-4">
                <FaCheckCircle />
              </div>
              <p className="text-gray-800 font-medium">{p}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyBuild;
