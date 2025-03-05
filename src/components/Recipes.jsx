import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../hooks/useApi';

function Recipes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6; 
  const navigate = useNavigate();
  const { data: recipes, loading, error, fetchRecipes } = useApi();

  useEffect(() => {
    fetchRecipes(); 
  }, [fetchRecipes]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        fetchRecipes(searchTerm);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm, fetchRecipes]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes(searchTerm);
    setCurrentPage(1); 
  };

  const handleRecipeClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes?.results?.slice(indexOfFirstRecipe, indexOfLastRecipe) || [];
  const totalPages = Math.ceil((recipes?.results?.length || 0) / recipesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={handleSearch} className="mb-8 flex gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search recipes by name or ingredients"
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
      </form>

      {loading ? (
        <p className="text-center text-gray-600">Loading recipes...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : currentRecipes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentRecipes.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => handleRecipeClick(recipe.id)}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <img
                  src={recipe.thumbnail_url}
                  alt={recipe.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{recipe.name}</h3>
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
      ) : (
        <p className="text-center text-gray-600">No recipes found</p>
      )}
    </div>
  );
}

export default Recipes;