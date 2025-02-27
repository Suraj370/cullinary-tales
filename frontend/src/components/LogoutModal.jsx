import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutModal = ({ isOpen, closeModal, onConfirm }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    onConfirm();
    navigate('/');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={closeModal}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Are you sure you want to logout?
        </h3>
        <div className="flex justify-end space-x-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            No
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;