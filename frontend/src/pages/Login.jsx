import React from 'react';
import { Link } from 'react-router';

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Form submitted');
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Logo/Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl text-orange-400 font-bold">Culinary Tales</h1>
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

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Sign In
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link to = '/signup'> Signup </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;