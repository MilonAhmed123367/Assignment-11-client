import React from "react";
import Banner from "../../Component/Banner/Banner";
import Overview from "../../Component/Overview/Overview";
import AboutSystem from "../../Component/AboutSystem/AboutSystem";
import WhyBuild from "../../Component/WhyBuild/WhyBuild";
import HowItWorks from "../../Component/HowItWorks/HowItWorks";
import Packages from "../../Component/Packages/Packages";

const Home = () => {
  return (
    <div>
      <Banner />
      <Overview />
      <AboutSystem />
      <WhyBuild />
      <HowItWorks />
      <Packages />
    </div>
  );
};

export default Home;
