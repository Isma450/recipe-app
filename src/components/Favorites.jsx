import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Favorites() {
  const [currentPage, setCurrentPage] = useState(1);
  const favoritesPerPage = 6; 
  const navigate = useNavigate();
  const { user, removeFavorite } = useAuth();

  // Calcul pour la pagination
  const indexOfLastFavorite = currentPage * favoritesPerPage;
  const indexOfFirstFavorite = indexOfLastFavorite - favoritesPerPage;
  const currentFavorites = user?.favorites?.slice(indexOfFirstFavorite, indexOfLastFavorite) || [];
  const totalPages = Math.ceil((user?.favorites?.length || 0) / favoritesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Favorite Recipes</h2>
      {currentFavorites.length === 0 ? (
        <p className="text-gray-600">No favorites yet!</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentFavorites.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={recipe.thumbnail_url}
                  alt={recipe.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex justify-between items-center">
                  <h3
                    onClick={() => navigate(`/recipe/${recipe.id}`)}
                    className="text-xl font-semibold text-gray-800 cursor-pointer hover:text-indigo-600"
                  >
                    {recipe.name}
                  </h3>
                  <button
                    onClick={() => removeFavorite(recipe.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => paginate(page)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === page
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Favorites;