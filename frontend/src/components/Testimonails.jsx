import React from "react";
import ProfilePic from "../assets/images.png";
import { AiFillStar } from "react-icons/ai";

const Testimonials = () => {
  const stars = Array(5).fill(null);
  return (
    <section className="bg-gray-50 py-16 px-4 md:px-8" id="testimonialsSection">
      <div className="max-w-5xl mx-auto">
        {/* Top Section */}
        <div className="text-center mb-12">
          <p className="text-indigo-600 font-semibold uppercase tracking-wide text-sm">
            Testimonial
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            What They Are Saying
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-relaxed">
            "This recipe app is a game-changer! The interface is intuitive, and
            the recipes are diverse and delicious. The step-by-step instructions
            make cooking a breeze."
          </p>
        </div>

        {/* Bottom Section - Testimonial Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-6">
            <img
              src={ProfilePic}
              alt="Jackson's profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100"
            />
            <p className="text-gray-600 italic leading-relaxed">
              "Great app with a wide variety of recipes. The visuals are
              appealing, and the categorization is helpful. Adding a feature to
              create shopping lists directly from recipes would make it even
              better."
            </p>
            <div className="flex text-yellow-400 text-xl gap-1">
              {stars.map((_, index) => (
                <AiFillStar key={index} />
              ))}
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Jackson</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
