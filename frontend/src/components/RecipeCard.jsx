import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ id, image, heading, servings, cuisines, recipeURL }) => {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleViewRecipeClick = () => {
    window.open(recipeURL);
    const user_id = localStorage.getItem('user_id');
    const data = { user_id, recipe_id: id };
    const url = 'http://localhost:5000/store_recipe';
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  };

  const handleLikeClick = () => {
    if (!loading) {
      setLoading(true);
      const user_id = localStorage.getItem('user_id');
      if (!user_id) {
        navigate('/login');
        return;
      }
      const data = { user_id, recipe_id: id };
      const url = liked ? 'http://localhost:5000/dislike_recipe' : 'http://localhost:5000/like_recipe';
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setLiked(!liked);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error:', error);
          setLoading(false);
        });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 mb-6">
    {/* Image Section */}
    <div className="relative">
      <img
        src={image}
        alt="Recipe Image"
        className="w-full h-48 object-cover"
      />
      {/* Like Button */}
      <div
        className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors cursor-pointer"
        onClick={handleLikeClick}
      >
        <FaHeart />
      </div>
    </div>

    {/* Content Section */}
    <div className="p-5">
      {/* Heading */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-3 truncate">
        {heading}
      </h2>

      {/* Details */}
      <div className="flex flex-col gap-2 text-gray-600 text-sm">
        <p>
          <span className="font-medium">Servings:</span>{' '}
          {servings && servings.length > 0 ? servings : 'N/A'}
        </p>
        <p className="truncate">
          <span className="font-medium">Cuisines:</span>{' '}
          {cuisines && cuisines.length > 0 ? cuisines.join(', ') : 'N/A'}
        </p>
      </div>

      {/* Button */}
      <button
        onClick={handleViewRecipeClick}
        className="mt-4 w-full py-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-500 hover:to-orange-700 transition-all duration-200"
      >
        View Recipe
      </button>
    </div>
  </div>
  );
};

export default RecipeCard;