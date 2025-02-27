import React from "react";
import BannerImage from "../assets/home-banner-image.png"; // Check case sensitivity
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) return;
  
    const startY = window.pageYOffset;
    const endY = section.getBoundingClientRect().top + startY;
    const duration = 1000;
  
    const startTime = performance.now();
  
    const scroll = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
  
      const newPos = startY + (endY - startY) * progress;
      window.scrollTo(0, newPos);
  
      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    };
  
    requestAnimationFrame(scroll);
  };

  const handleRecipeButtonClick = () => {
    scrollToSection("featuresSection");
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-orange-50 to-amber-100">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 flex flex-col lg:flex-row items-center justify-between">
        {/* Text Section */}
        <div className="lg:w-1/2 space-y-6 lg:space-y-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
            "Life is a combination of<br />
            <span className="text-orange-500">magic and pasta.</span>"
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-md">
            Cooking is not just about making food. It's about creating a moment that lasts a lifetime.
          </p>
          <button
            onClick={handleRecipeButtonClick}
            className="group flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-full font-medium
              hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Get Started
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 mt-12 lg:mt-0 relative z-10 animate-fade-in-right">
          <div className="relative w-full max-w-md mx-auto">
            <img
              src={BannerImage}
              alt="Delicious pasta dish"
              className="w-full h-auto object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-200 rounded-full opacity-50 animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-amber-300 rounded-full opacity-50 animate-pulse delay-200"></div>
          </div>
        </div>
      </div>

      {/* Optional decorative wave at bottom */}
      <div className="absolute bottom-0 w-full overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-20 text-white"
        >
          <path
            d="M0,0 C300,100 900,0 1200,80 L1200,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;