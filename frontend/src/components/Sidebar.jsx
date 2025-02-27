import React, { useState, useEffect } from 'react';
import ingredientData from '../data/data';

const Sidebar = ({ setRecipes }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [popoverVisible, setPopoverVisible] = useState(false);

  const toggleCollapsed = () => setCollapsed(!collapsed);
  const togglePopover = () => setPopoverVisible(!popoverVisible);

  const handleSearch = async (value) => {
    setSearchValue(value);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/food/ingredients/autocomplete?query=${value}&apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleClick = (name) => {
    setSelectedIngredients((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const handleDelete = (name) => {
    setSelectedIngredients((prev) => prev.filter((item) => item !== name));
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        if (selectedIngredients.length === 0) {
          setRecipes([]);
          return;
        }

        const response = await fetch(
          `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${selectedIngredients.join(
            ','
          )}&number=10&apiKey=c2c00766233746258aff9e15c00e6ec1`
        );
        const data = await response.json();
        const recipeIds = data.map((recipe) => recipe.id);

        const recipeDetailsPromises = recipeIds.map((id) =>
          fetch(
            `https://api.spoonacular.com/recipes/${id}/information?apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`
          )
        );
        const recipeDetailsResponses = await Promise.all(recipeDetailsPromises);
        const recipeDetailsData = await Promise.all(
          recipeDetailsResponses.map((response) => response.json())
        );

        setRecipes(recipeDetailsData);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, [selectedIngredients]);

  return (
    <div
      className={`bg-white h-screen border-r-4 border-gray-200 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-96'
      }`}
    >
      <div className="p-4">
        {/* Collapse Button */}
        <button
          onClick={toggleCollapsed}
          className="mb-4 p-2 rounded-md hover:bg-gray-100"
        >
          <svg
            className="h-6 w-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={collapsed ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'}
            />
          </svg>
        </button>

        {/* Search Bar */}
        {!collapsed && (
          <>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search ingredients..."
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
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

            {/* Selected Ingredients Popover */}
            <div className="relative mb-4">
              <button
                onClick={togglePopover}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>{selectedIngredients.length} selected</span>
              </button>

              {popoverVisible && (
                <div className="absolute z-10 w-64 bg-white rounded-md shadow-lg p-2 mt-2">
                  {selectedIngredients.map((name) => (
                    <div
                      key={name}
                      className="flex items-center justify-between py-1 px-2 hover:bg-gray-100 rounded"
                    >
                      <span className="text-sm">{name}</span>
                      <button
                        onClick={() => handleDelete(name)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {searchResults.map((ingredient, index) => (
                  <button
                    key={index}
                    onClick={() => handleClick(ingredient.name)}
                    className={`px-3 py-2 rounded-md shadow-sm text-sm ${
                      selectedIngredients.includes(ingredient.name)
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                    style={{ minWidth: '100px' }}
                  >
                    {ingredient.name}
                  </button>
                ))}
              </div>
            )}

            {/* Ingredient List */}
            <h3 className="text-lg font-semibold mb-4">List of Ingredients</h3>
            <div className="flex flex-wrap gap-2">
              {ingredientData.map((ingredient, index) => (
                <button
                  key={index}
                  onClick={() => handleClick(ingredient.name)}
                  className={`px-3 py-2 rounded-md shadow-sm text-sm ${
                    selectedIngredients.includes(ingredient.name)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  style={{ minWidth: '100px' }}
                >
                  {ingredient.name}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;