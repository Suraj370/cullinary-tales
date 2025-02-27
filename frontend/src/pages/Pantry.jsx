import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import RecipeCard from '../components/RecipeCard.jsx';
import Mainnav from '../components/MainNav.jsx';

const Pantry = () => {
  const [query, setQuery] = useState('');
  const [recipesFromSearch, setRecipesFromSearch] = useState([]);
  const [recipesFromSidebar, setRecipesFromSidebar] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = async (value) => {
    setQuery(value);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${value}&apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}&addRecipeInformation=true&number=10`
      );
      const data = await response.json();
      setRecipesFromSearch(data.results);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleSidebarRecipes = (data) => {
    setRecipesFromSidebar(data);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Mainnav />
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <Sidebar setRecipes={handleSidebarRecipes} />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search recipes..."
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm placeholder-gray-500"
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Recipes Grid */}
          <div className="max-w-7xl mx-auto">
            {recipesFromSearch.length > 0 || recipesFromSidebar.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...recipesFromSearch, ...recipesFromSidebar].map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    id={recipe.id}
                    image={recipe.image}
                    heading={recipe.title}
                    servings={recipe.servings}
                    cuisines={recipe.cuisines}
                    recipeURL={recipe.sourceUrl}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <p className="text-lg">No recipes found</p>
                <p className="text-sm mt-2">Try searching for a recipe or selecting ingredients from the sidebar</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pantry;