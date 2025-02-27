import React from "react";
import Untitled from "../Assets/Untitled.svg";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-center md:justify-start">
            <h1 className=" text-2xl font-bold ">Cullinary Tales</h1>
          </div>
          <div className="flex justify-center md:justify-start gap-6">
            <a href="#" className="hover:text-blue-400 transition-colors duration-200">
              <BsTwitter className="text-2xl" />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors duration-200">
              <SiLinkedin className="text-2xl" />
            </a>
            <a href="#" className="hover:text-red-500 transition-colors duration-200">
              <BsYoutube className="text-2xl" />
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors duration-200">
              <FaFacebookF className="text-2xl" />
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300 transition-colors">Quality</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Help</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Share</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Testimonials</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">Contact</h3>
            <ul className="space-y-2">
              <li><a href="tel:+919557893981" className="hover:text-gray-300 transition-colors">+91 9557893981</a></li>
              <li><a href="mailto:parul947a@gmail.com" className="hover:text-gray-300 transition-colors">parul947a@gmail.com</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;