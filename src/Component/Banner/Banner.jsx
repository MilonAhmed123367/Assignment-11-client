import React from 'react';
import office from '../../assets/corporate office.jpg'


const Banner = () => {
  return (
    <div className="mt-10 relative w-full">
      <img
        className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] object-cover rounded-2xl brightness-40"
        src={office}
        alt="Office Background"
      />
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-8 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#E2852E] to-[#F5C857] text-transparent bg-clip-text leading-snug sm:leading-snug md:leading-snug lg:leading-snug">
          AssetVerse lets companies track all their assets, see who has them,<br className="hidden sm:block" />
          approve requests, and manage everything in one place—making <br className="hidden sm:block" />
          asset management simple and organized.
        </h1>
      </div>
    </div>

  );
};

export default Banner;