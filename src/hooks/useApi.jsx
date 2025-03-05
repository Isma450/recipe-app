import { useState, useCallback } from 'react';
import axios from 'axios';

// Configuration de base
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const API_HOST = import.meta.env.VITE_API_HOST;

const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 heures

const useApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const getCachedData = useCallback((key) => {
    const cached = localStorage.getItem(key);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      const now = new Date().getTime();
      if (now - timestamp < CACHE_EXPIRATION) {
        return data;
      }
    }
    return null;
  }, []);

  const setCachedData = useCallback((key, data) => {
    localStorage.setItem(key, JSON.stringify({
      data,
      timestamp: new Date().getTime()
    }));
  }, []);


  const fetchData = useCallback(async (endpoint, params = {}, cacheKey) => {
    if (cacheKey) {
      const cachedData = getCachedData(cacheKey);
      if (cachedData) {
        setData(cachedData);
        return cachedData;
      }
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        method: 'GET',
        url: `${BASE_URL}${endpoint}`,
        params,
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': API_HOST
        }
      });
      
      const responseData = response.data;
      if (cacheKey) {
        setCachedData(cacheKey, responseData);
      }
      setData(responseData);
      return responseData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [getCachedData, setCachedData]);


  const fetchRecipes = useCallback((query = '') => {
    const cacheKey = `recipes_${query || 'default'}`;
    return fetchData('/recipes/list', { from: '0', size: '20', q: query }, cacheKey)
      .then((response) => response); 
  }, [fetchData]);

  const fetchRecipeDetail = useCallback((id) => {
    const cacheKey = `recipe_${id}`;
    return fetchData('/recipes/get-more-info', { id }, cacheKey);
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    fetchRecipes,
    fetchRecipeDetail
  };
};

export default useApi;