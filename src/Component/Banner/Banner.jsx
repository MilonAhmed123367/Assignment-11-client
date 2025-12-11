import React from "react";
import office from "../../assets/corporate office.jpg";
import { FaArrowTrendUp } from "react-icons/fa6";

const Banner = () => {
  return (
    <div className="relative w-full mt-10">
      {/* Background Image */}
      <img
        className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] object-cover rounded-2xl  brightness-30"
        src={office}
        alt="Office Background"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-opacity-40 rounded-2xl"></div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center px-6 sm:px-10 text-center">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            AssetVerse helps companies effortlessly track and manage all their
            assets — see who has them, approve requests, and keep everything
            organized in one place.
          </h1>

          <p className="text-lg sm:text-xl text-gray-200 mb-8">
            Simplify asset management with real‑time visibility, smart workflows,
            and intuitive controls built for teams of every size.
          </p>

          <button className="bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition flex justify-center items-center gap-2 mx-auto">
            Get Started <FaArrowTrendUp />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
