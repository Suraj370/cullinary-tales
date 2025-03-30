// DetailsBoard.js
import React, { useState } from "react";
import { Button, DatePicker } from "antd";
import {
  UserOutlined,
  MailOutlined,
  MenuOutlined,
  HomeOutlined,
  HistoryOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import { useAuth } from "../context/user";

const DetailsBoard = () => {
  const [selectedOption, setSelectedOption] = useState("personalInfo");
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const [historyRecipes, setHistoryRecipes] = useState([]);
  const { user } = useAuth();

  const handlePersonalInfoClick = () => {
    setSelectedOption("personalInfo");
  };
  const fetchRecipeDetails = async (recipeIds) => {
    if (!recipeIds || recipeIds.length === 0) {
      console.warn("No recipe IDs provided. Skipping recipe fetch.");
      return []; // Return an empty array to maintain consistency in the return type
    }

    try {
      console.log(recipeIds);

      const promises = recipeIds.map((id) =>
        axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${
            import.meta.env.VITE_SPOONACULAR_API_KEY
          }`
        )
      );
      const recipeDetails = await Promise.all(promises);
      return recipeDetails.map((res) => res.data);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
      throw new Error("Unable to fetch recipe details.");
    }
  };

  const handleUserFavoritesClick = async () => {
    setSelectedOption("userFavorites");
    try {
      console.log(user);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/favorite-recipes`,
        {
          user_id: user.id,
        }
      );

      if (response.status === 200) {
        const recipeIds = response.data.favourite_recipes;
        const favoriteRecipes = await fetchRecipeDetails(recipeIds);
        setFavoriteRecipes(favoriteRecipes);
      } else {
        console.error("Failed to fetch favorite recipes:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching favorite recipes:", error.message || error);
    }
  };

  const fetchHistoryRecipeDetails = async (historyRecipes) => {
    try {
      const promises = historyRecipes.map(async (recipe) => {
        const recipeDetail = await axios.get(
          `https://api.spoonacular.com/recipes/${recipe.recipe_id}/information?apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`
        );
        return { ...recipeDetail.data, date_of_access: recipe.date_of_access };
      });
      return await Promise.all(promises);
    } catch (error) {
      console.error("Error fetching history recipe details:", error);
      throw new Error("Unable to fetch history recipe details.");
    }
  };

  const handleHistoryClick = async () => {
    setSelectedOption("history");
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/history`, {
        user_id: user.id,
      });

      if (response.status === 200) {
        const historyRecipes = response.data.history;
        const historyRecipeDetails = await fetchHistoryRecipeDetails(
          historyRecipes
        );
        setHistoryRecipes(historyRecipeDetails);
      } else {
        console.error("Failed to fetch history recipes:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching history recipes:", error.message || error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold text-gray-800 mt-2 mb-6">
          Details Board
        </h2>
        <a
          href="#"
          onClick={handlePersonalInfoClick}
          className="flex items-center text-gray-700 hover:text-blue-600 mb-4 text-lg"
        >
          <HomeOutlined className="mr-4" />
          Personal Information
        </a>
        <a
          href="#"
          onClick={handleUserFavoritesClick}
          className="flex items-center text-gray-700 hover:text-blue-600 mb-4 text-lg"
        >
          <HeartOutlined className="mr-4" />
          Favourite Recipes
        </a>
        <a
          href="#"
          onClick={handleHistoryClick}
          className="flex items-center text-gray-700 hover:text-blue-600 mb-4 text-lg"
        >
          <HistoryOutlined className="mr-4" />
          History
        </a>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {selectedOption === "personalInfo" && (
          <div className="bg-white border border-gray-300 rounded-md p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Personal Information
            </h2>
            <div className="flex items-center mb-4">
              <UserOutlined className="text-lg mr-3 text-gray-600" />
              <p className="text-base text-gray-700">
                Name: {localStorage.getItem("name")}
              </p>
            </div>
            <div className="flex items-center mb-4">
              <UserOutlined className="text-lg mr-3 text-gray-600" />
              <p className="text-base text-gray-700">
                Username: {localStorage.getItem("username")}
              </p>
            </div>
            <div className="flex items-center mb-4">
              <MailOutlined className="text-lg mr-3 text-gray-600" />
              <p className="text-base text-gray-700">
                Email: {localStorage.getItem("email")}
              </p>
            </div>
          </div>
        )}

        {selectedOption === "userFavorites" && (
          <div>
            {favoriteRecipes.length > 0 ? (
              <>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Favorite Recipes
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteRecipes.map((recipe) => (
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
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Favourite Recipes
                </h2>
                <p className="text-gray-600">No favorite recipes found</p>
              </>
            )}
          </div>
        )}

        {selectedOption === "history" && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Recipe History
            </h2>
            {historyRecipes.length > 0 ? (
              Object.entries(
                historyRecipes.reduce((acc, recipe) => {
                  const date = new Date(
                    recipe.date_of_access
                  ).toLocaleDateString("en-US", {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  });
                  acc[date] = [...(acc[date] || []), recipe];
                  return acc;
                }, {})
              ).map(([date, recipes]) => (
                <div key={date} className="mb-6">
                  <h5 className="text-lg font-medium text-gray-700 mb-3">
                    {date}
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map((recipe) => (
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
                </div>
              ))
            ) : (
              <p className="text-gray-600">No history recipes found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsBoard;
