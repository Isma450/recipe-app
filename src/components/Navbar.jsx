import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/recipes" className="text-white text-2xl font-bold tracking-tight">
          Recipe Haven
        </Link>
        {user && (
          <div className="space-x-4">
            <Link
              to="/recipes"
              className="text-white hover:text-indigo-200 transition-colors duration-200"
            >
              Recipes
            </Link>
            <Link
              to="/favorites"
              className="text-white hover:text-indigo-200 transition-colors duration-200"
            >
              Favorites
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;