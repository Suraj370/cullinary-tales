import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from "react-icons/fi";
import { useAuth } from '../context/user';


const Options = () => {
  const navigate = useNavigate();
    const {user} = useAuth();
  


  const handleDietPlansClick = () => {
    navigate('/diet');
  };

  const handleExploreRecipesClick = () => {
    navigate('/explore');
  };

  const handlePantrySpecificsClick = () => {
    if (user) {
      navigate('/pantry');
    } else {
      navigate('/login');
    }
  };

  return (
    <section 
      id="featuresSection" 
      className="py-16 bg-gray-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading Section */}
        <div className="text-center mb-12">
          <p className="text-orange-500 text-lg font-semibold uppercase tracking-wide animate-fade-in">
            Our Features
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 animate-fade-in-up">
            What are you thinking?
          </h1>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Explore Recipes Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Explore Recipes
            </h2>
            <p className="text-gray-600 mb-6">
              Discover delicious recipes from around the world.
            </p>
            <button
              onClick={handleExploreRecipesClick}
              className="group flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full
                hover:bg-orange-600 transition-all duration-300 w-fit"
            >
              Learn More
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Diet Plans Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Diet Plans
            </h2>
            <p className="text-gray-600 mb-6">
              Find the perfect recipes tailored to your diet plan.
            </p>
            <button
              onClick={handleDietPlansClick}
              className="group flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full
                hover:bg-orange-600 transition-all duration-300 w-fit"
            >
              Learn More
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Pantry Specifics Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Pantry Specifics
            </h2>
            <p className="text-gray-600 mb-6">
              Explore recipes based on your pantry ingredients.
            </p>
            <button
              onClick={handlePantrySpecificsClick}
              className="group flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full
                hover:bg-orange-600 transition-all duration-300 w-fit"
            >
              Learn More
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Options;