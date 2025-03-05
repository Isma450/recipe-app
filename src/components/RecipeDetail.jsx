import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { useAuth } from '../context/AuthContext';

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: recipe, loading, error, fetchRecipeDetail } = useApi();
  const { addFavorite, user } = useAuth();

  useEffect(() => {
    fetchRecipeDetail(id);
  }, [id, fetchRecipeDetail]);

  const handleAddFavorite = () => {
    addFavorite(recipe);
  };

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (error) return <div className="text-center p-6 text-red-500">Error: {error}</div>;
  if (!recipe) return <div className="text-center p-6">Recipe not found</div>;

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => navigate('/recipes')}
        className="mb-4 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
      >
        Back to Recipes
      </button>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={recipe.thumbnail_url}
            alt={recipe.name}
            className="w-full md:w-1/2 h-96 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{recipe.name}</h2>
            <p className="text-gray-600 mb-4">{recipe.description}</p>
            <button
              onClick={handleAddFavorite}
              disabled={user.favorites.some(fav => fav.id === recipe.id)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
            >
              {user.favorites.some(fav => fav.id === recipe.id) ? 'In Favorites' : 'Add to Favorites'}
            </button>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Ingredients</h3>
          <ul className="list-disc pl-5">
            {recipe.sections?.[0]?.components?.map((item, index) => (
              <li key={index} className="text-gray-600">{item.raw_text}</li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Instructions</h3>
          <ol className="list-decimal pl-5">
            {recipe.instructions?.map((step, index) => (
              <li key={index} className="text-gray-600 mb-2">{step.display_text}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;