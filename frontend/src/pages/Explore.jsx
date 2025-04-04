import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import RecipeCard from '../components/RecipeCard';
import Mainnav from '../components/MainNav';

const categoryImages = [
  { name: 'Main Course', image: 'https://st2.depositphotos.com/3210553/9823/i/450/depositphotos_98232150-stock-photo-pan-fried-salmon-with-tender.jpg' },
  { name: 'Side Dish', image: 'https://www.acouplecooks.com/wp-content/uploads/2021/06/Vegetable-Kabobs-001.jpg' },
  { name: 'Dessert', image: 'https://www.foodandwine.com/thmb/ckc6L6xKox0WfpfO6dMkuVGPQOY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Angel-Food-Cake-with-Three-Berry-Compote-FT-RECIPE0323-541a780b871441e0ab14383ee38acc44.jpg' },
  { name: 'Appetizer', image: 'https://www.eatingwell.com/thmb/VZOpYLlkdhow-YKvWLTlotmVRjY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/loaded-smashed-brussels-sprouts-4f5ab837d61d40c8a5bf27a398ca29eb.jpg' },
  { name: 'Salad', image: 'https://www.licious.in/blog/wp-content/uploads/2022/11/shutterstock_310087187.jpg' },
  { name: 'Bread', image: 'https://blog.naturesbasket.co.in/wp-content/uploads/2018/10/A-World-of-Breads.jpg' },
  { name: 'Breakfast', image: 'https://simply-delicious-food.com/wp-content/uploads/2022/09/Breakfast-board27.jpg' },
  { name: 'Soup', image: 'https://sugarspunrun.com/wp-content/uploads/2021/09/Tomato-Soup-Recipe-7-of-8.jpg' },
  { name: 'Beverage', image: 'https://www.drinkpreneur.com/wp-content/uploads/2016/12/drinkpreneur_819_main.jpg' },
  { name: 'Finger Food', image: 'https://images.immediate.co.uk/production/volatile/sites/30/2022/05/Arancini-bites-hero-image-20583bc.jpg?quality=90&webp=true&resize=375,341' },
  { name: 'Snack', image: 'https://www.tastingtable.com/img/gallery/25-most-popular-snacks-in-america-ranked-worst-to-best/intro-1645492743.webp' },
  { name: 'Drink', image: 'https://img.freepik.com/free-photo/fresh-cocktails-with-ice-lemon-lime-fruits-generative-ai_188544-12370.jpg?size=626&ext=jpg&ga=GA1.1.87170709.1707609600&semt=sph' },
];

const Explore = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchRandomRecipes();
  }, []);


  const fetchRandomRecipes = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}&number=10&addRecipeInformation=true`
      );
      if (!response.ok) throw new Error('Failed to fetch random recipes');
      const data = await response.json();
      setRecipes(data.recipes);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryClick = async (category) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey==${import.meta.env.VITE_SPOONACULAR_API_KEY}&number=15&addRecipeInformation=true&type=${category.toLowerCase().replace(/\s+/g, '-')}`
      );
      if (!response.ok) throw new Error(`Failed to fetch recipes for ${category}`);
      const data = await response.json();
      setRecipes(data.results);
    } catch (error) {
      console.error('Error fetching category recipes:', error);
    }
  };

  const handleSearch = async (value) => {
    setQuery(value);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${value}&apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}&addRecipeInformation=true&number=20`
      );
      if (!response.ok) throw new Error('Failed to fetch recipes');
      const data = await response.json();
      setRecipes(data.results);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 2 }
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 2, slidesToScroll: 1 }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Mainnav />
      <div className="py-8">
        {/* Category Carousel */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Slider {...carouselSettings}>
            {categoryImages.map((category, index) => (
              <div
                key={index}
                onClick={() => handleCategoryClick(category.name)}
                className="px-2 cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center py-2">
                    <p className="text-sm font-medium">{category.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto px-4 mb-8">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {recipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          ) : (
            <div className="text-center text-gray-500 py-12">
              <p className="text-lg">No recipes found</p>
              <p className="text-sm mt-2">Try searching or selecting a category</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;