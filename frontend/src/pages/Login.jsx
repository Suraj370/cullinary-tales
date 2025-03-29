import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Fixed incorrect import
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState(""); // ✅ State for email
  const [password, setPassword] = useState(""); // ✅ State for password
  const [message, setMessage] = useState(""); // ✅ State for messages
  const navigate = useNavigate(); // ✅ Initialize useNavigate


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      

      localStorage.setItem("auth_token", response.data.token); // Store JWT

      setMessage(response.data.message); // ✅ Show success message
      navigate("/");
    } catch (error) {
      setMessage("Login failed. Try again."); // ✅ Handle errors
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Logo/Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl text-orange-400 font-bold">Culinary Tales</h1>
          <p className="text-gray-600">Sign in to explore delicious stories</p>
        </div>

        {/* Display Message */}
        {message && <p className="text-center text-red-500">{message}</p>}

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
              value={email} // ✅ Controlled input
              onChange={(e) => setEmail(e.target.value)} // ✅ Update state
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
              value={password} // ✅ Controlled input
              onChange={(e) => setPassword(e.target.value)} // ✅ Update state
              required
            />
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
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
