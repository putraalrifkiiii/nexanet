import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeatureSection from "@/components/sections/FeatureSection";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <Footer />
    </div>
  );
};

export default HomePage;
