import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const DEFAULT_USERNAME = import.meta.env.VITE_DEFAULT_USERNAME;
  const DEFAULT_PASSWORD = import.meta.env.VITE_DEFAULT_PASSWORD;

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('authUser');
    const storedFavorites = JSON.parse(localStorage.getItem('user_favorites') || '[]');
    return storedUser ? { ...JSON.parse(storedUser), favorites: storedFavorites } : null;
  });

  useEffect(() => {
    if (user) {
      
      const minimalUser = { username: user.username };
      localStorage.setItem('authUser', JSON.stringify(minimalUser));
      
      localStorage.setItem('user_favorites', JSON.stringify(user.favorites));
    } else {
      localStorage.removeItem('authUser');
      
    }
  }, [user]);

  const login = (username, password) => {
    if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
      const newUser = {
        username: DEFAULT_USERNAME,
        favorites: JSON.parse(localStorage.getItem('user_favorites') || '[]')
      };
      setUser(newUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    if (user) {
      localStorage.setItem('user_favorites', JSON.stringify(user.favorites));
      setUser(null);
    }
  };

  const addFavorite = (recipe) => {
    if (user && !user.favorites.some(fav => fav.id === recipe.id)) {
      const updatedUser = {
        ...user,
        favorites: [...user.favorites, { id: recipe.id, name: recipe.name, thumbnail_url: recipe.thumbnail_url }]
      };
      setUser(updatedUser);
    }
  };

  const removeFavorite = (recipeId) => {
    if (user) {
      const updatedUser = {
        ...user,
        favorites: user.favorites.filter(fav => fav.id !== recipeId)
      };
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, addFavorite, removeFavorite }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);