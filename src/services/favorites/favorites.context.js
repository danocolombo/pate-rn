import React, { createContext, useState } from "react";

export const FavoritesContext = createContext();

export const FavoritesContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const add = (event) => {
    setFavorites([...favorites, event]);
  };
  const remove = (event) => {
    const newFavs = favorites.filter((x) => x.uid !== event.uid);
    setFavorites(newFavs);
  };
  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites: add, removeFromFavorites: remove }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
