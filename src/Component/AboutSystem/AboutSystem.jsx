import React from "react";

import png1 from '../../assets/pngegg (2).png'
import png2 from '../../assets/pngegg (3).png'

const AboutSystem = () => {
  return (
    <div className="py-16 bg-gray-50 px-5 mb-10">

      <div className="flex">
        <div className="basis-3/12">
         <img className="w-70 mx-auto my-auto" src={png1} alt="" />
        </div>

        <div className="basis-6/12">
          <div className="max-w-5xl mx-auto">

            <h2 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text">
              What is AssetVerse?
            </h2>

            <p className="text-gray-700 leading-relaxed text-xl ">
              AssetVerse is a comprehensive digital platform that helps companies
              efficiently manage their physical assets (laptops, keyboards, chairs,
              etc.) and track which employee has which equipment. It solves the
              common problem of companies losing track of valuable assets and
              streamlines the entire asset management process.
            </p>

          </div>
        </div>

        <div className="basis-3/12">
          <img className="w-70 mx-auto my-auto" src={png2} alt="" />
        </div>
      </div>

    </div>
  );
};

export default AboutSystem;
