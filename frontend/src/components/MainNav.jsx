import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/user';

import LogoutModal from './LogoutModal'; 
const Mainnav = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const {user} = useAuth();

  

 

  const handleLogin = () => navigate('/Login');
  const handleSignup = () => navigate('/Signup');
  const handleDashboardClick = () => navigate('/detailsboard');

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setIsLogoutModalOpen(false);
  };

  const handlePantryLinkClick = (e) => {
    if (!user) {
      e.preventDefault();
      navigate('/login');
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
             <h1 className='text-orange-500 font-semibold'>Cullinary Tales</h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link
              to="/pantry"
              onClick={handlePantryLinkClick}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Pantry
            </Link>
            <Link to="/explore" className="text-gray-700 hover:text-blue-600 transition-colors">
              Explore
            </Link>
            <Link to="/diet" className="text-gray-700 hover:text-blue-600 transition-colors">
              Diet Plans
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="focus:outline-none"
                >
                  <svg
                    className="h-8 w-8 text-gray-700 hover:text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <button
                      onClick={handleDashboardClick}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogoutClick}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-x-4">
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={handleSignup}
                  className="px-4 py-2 bg-transparent text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                >
                  Signup
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Home
            </Link>
            <Link
              to="/pantry"
              onClick={handlePantryLinkClick}
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Pantry
            </Link>
            <Link
              to="/explore"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Explore
            </Link>
            <Link
              to="/diet"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Diet Plans
            </Link>
            {user ? (
              <>
                <button
                  onClick={handleDashboardClick}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogoutClick}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleLogin}
                  className="block w-full px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Login
                </button>
                <button
                  onClick={handleSignup}
                  className="block w-full px-3 py-2 bg-transparent text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                >
                  Signup
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Logout Modal - Assuming it's a separate component */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        closeModal={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </nav>
  );
};

export default Mainnav;