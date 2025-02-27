// Login.js
import React from "react";
import { Link } from "react-router";
const Signup = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log("Form submitted");
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Logo/Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl text-orange-400 font-bold text-gray-800">
            Culinary Tales
          </h1>
          <p className="text-gray-600">Sign in to explore delicious stories</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Sign up
          </button>
        </form>
        {/* Sign Up Link */}
        <div>
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account? <Link to="/login"> Sign in </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
