import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaCheck } from "react-icons/fa";

const Packages = () => {
  const axiosSecure = useAxiosSecure();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/packages")
      .then((res) => {
        setPackages(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch packages:", err);
        setLoading(false);
      });
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="py-20 text-center text-xl font-semibold text-gray-600">
        Loading Packages...
      </div>
    );
  }

  return (
    <div className="py-20 px-5 bg-gradient-to-b from-gray-50 to-white">
      <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text mb-12">
        Subscription Packages
      </h2>

      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
        {packages.map((pkg,) => (
          <div
            key={pkg._id}
            className={`
              relative group flex flex-col justify-between p-8 rounded-2xl border-2 transition transform hover:-translate-y-2 hover:shadow-2xl
              ${
                pkg.recommended
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200 bg-white"
              }
            `}
          >
            {/* Badge */}
            {pkg.recommended && (
              <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-indigo-600 text-white py-1 px-3 rounded-full text-sm font-semibold shadow-lg">
                Most Popular
              </div>
            )}

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {pkg.name}
            </h3>

            {/* Price */}
            <div className=" mb-4">
              <span className="text-5xl font-extrabold text-primary">
                ${pkg.price}
              </span>
              <span className="text-lg text-gray-600">/mo</span>
            </div>

            {/* Limit */}
            <p className=" text-gray-700 font-medium mb-4">
              Up to{" "}
              <span className="text-secondary font-bold">
                {pkg.employeeLimit}
              </span>{" "}
              employees
            </p>

            {/* Feature List */}
            <ul className="space-y-3 mb-6 text-gray-700">
              {pkg.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <FaCheck className="text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button className="mt-auto bg-primary text-white font-semibold py-2 rounded-xl hover:bg-indigo-700 transition">
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
