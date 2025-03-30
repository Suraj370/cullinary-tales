import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/user';

const RecipeCard = ({ id, image, heading, servings, cuisines, recipeURL }) => {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {user} = useAuth();
  

  const handleViewRecipeClick = () => {
    // window.open(recipeURL);
    const user_id = localStorage.getItem('user_id');
    const data = { user_id: user.id, recipe_id: id };
    const url = `${import.meta.env.VITE_BACKEND_URL}/store_recipe`;

  
    axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // This ensures credentials are sent with the request
    })
    .then(response => console.log(response.data))
    .catch(error => console.error('Error:', error));
  };
  
  const handleLikeClick = () => {
    if (!loading) {
      setLoading(true); // Set loading to true to prevent multiple clicks
  

      console.log(id);

      
      if (!user.id) {
        navigate('/login');
        setLoading(false); // Make sure to reset loading state when redirecting
        return;
      }
  
      const data = { user_id: user.id, recipe_id: id };
      const url = liked ? `${import.meta.env.VITE_BACKEND_URL}/dislike_recipe` : `${import.meta.env.VITE_BACKEND_URL}/like_recipe`;
  
      // Use Axios to send POST request
      axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // If needed, include credentials (cookies) with the request
      })
        .then(response => {
          console.log(response.data); // Handle successful response
          setLiked(!liked); // Toggle the like/dislike state
          setLoading(false); // Reset loading state
        })
        .catch(error => {
          console.error('Error:', error); // Handle error response
          setLoading(false); // Reset loading state in case of error
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