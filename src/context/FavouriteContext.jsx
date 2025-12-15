import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase'; 

const FavoriteContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoriteProvider');
  }
  return context;
};

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  //load favorites từ localStorage khi đăng nhập
  useEffect(() => {
    const loadFavorites = () => {
      const user = auth.currentUser;
      if (user) {
        const storedFavorites = localStorage.getItem(`favorites_${user.uid}`);
        if (storedFavorites) {
          try {
            setFavorites(JSON.parse(storedFavorites));
          } catch (error) {
            console.error('Error loading favorites:', error);
            setFavorites([]);
          }
        }
      }
    };

    loadFavorites();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        loadFavorites();
      } else {
        setFavorites([]);
      }
    });

    return () => unsubscribe();
  }, []);

  //lưu favorites vào localStorage 
  useEffect(() => {
    const user = auth.currentUser;
    if (user && favorites.length >= 0) {
      localStorage.setItem(`favorites_${user.uid}`, JSON.stringify(favorites));
    }
  }, [favorites]);

  const addFavorite = (item) => {
    const user = auth.currentUser;
    if (!user) {
      alert('Login to add favorites!');
      return;
    }

    setFavorites(prev => {
      //check danh sách
      if (prev.find(fav => fav.id === item.id)) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeFavorite = (itemId) => {
    setFavorites(prev => prev.filter(item => item.id !== itemId));
  };

  const isFavorite = (itemId) => {
    return favorites.some(item => item.id === itemId);
  };

  const clearFavorites = () => {
    const user = auth.currentUser;
    if (user) {
      localStorage.removeItem(`favorites_${user.uid}`);
      setFavorites([]);
    }
  };

  return (
    <FavoriteContext.Provider value={{
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
      clearFavorites
    }}>
      {children}
    </FavoriteContext.Provider>
  );
};