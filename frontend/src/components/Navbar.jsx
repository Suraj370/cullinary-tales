import React from "react";
import { FaHome } from "react-icons/fa";
import { FaMagnifyingGlass, FaBowlFood } from "react-icons/fa6";
import { FaCommentAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";

function Navbar() {

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (!section) return;
      
        const startY = window.pageYOffset;
        const endY = section.getBoundingClientRect().top + startY;
        const duration = 1000; // Adjust duration as needed (in milliseconds)
      
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
  const menuOptions = [
    {
      text: "Home",
      icon: <FaHome />,
      onClick: () => scrollToSection("homeSection"),
    },

    {
      text: "Features",
      icon: <FaBowlFood />,
      onClick: () => scrollToSection("featuresSection"),
    },
    {
      text: "Testimonials",
      icon: <FaCommentAlt />,
      onClick: () => scrollToSection("testimonialsSection"),
    },
    {
      text: "Contact",
      icon: <FaPhone />,
      onClick: () => scrollToSection("contactSection"),
    },
  ];

  return (
    <div className="mx-auto flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="hover:cursor-pointer text-orange-400 font-bold">
        Cullinary tales
      </h1>
      <div className="navbar-links-container flex gap-6">
        {menuOptions.map((item) => (
          <a
            href="#"
            key={item.text}
            className="hover:text-orange-400 flex flex-col items-center"
            onClick={(e) => {
              e.preventDefault();
              item.onClick();
            }}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-sm">{item.text}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Navbar;