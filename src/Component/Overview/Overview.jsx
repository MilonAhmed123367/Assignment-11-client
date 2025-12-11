import React from "react";
import img from '../../assets/team-discussion.jpg'

const Overview = () => {
  return (
    <div className="py-16 bg-white px-5 mt-10">
      <h2 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text">
        Project Overview & Discussion
      </h2>

      <div className="flex">
        <div className="flex-1">
          <img className="w-[811px] h-[312px] rounded-2xl" src={img} alt="" />
        </div>

        <div className="max-w-4xl mx-auto flex-1 pl-20">



          <p className="text-gray-700 leading-relaxed mb-5 text-2xl font-semibold">
            <strong>Theme:</strong> A B2B (Business-to-Business) HR & Asset
            Management Web Application.
          </p>


          <p className="text-gray-700 leading-relaxed text-xl">
            This project is carefully crafted to evaluate not only your technical skills but also your creativity and problem-solving capabilities. Through this task, we aim to gain insight into how you approach complex challenges, design efficient solutions, and deliver high-quality, maintainable code. Your ability to think critically, innovate, and implement best practices will be essential in showcasing your suitability for the role. This exercise also reflects real-world scenarios where adaptability and attention to detail are key to success.
          </p>



        </div>
      </div>

    </div>

  );
};

export default Overview;
