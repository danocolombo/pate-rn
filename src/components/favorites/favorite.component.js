import React, { useContext } from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { FavoritesContext } from "../../services/favorites/favorites.context";

const FavoriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 3px;
  right: 5px;
  z-index: 9;
`;

export const Favorite = ({ event }) => {
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);
  console.log("FAVORITES:\n", favorites);
  const isFavorite0 = favorites.find((e) => e.uid === event.uid);
  const isFavorite = () => {
    favorites ? favorites.find((e) => e.uid === event.uid) : false;
  };


  return (
    <FavoriteButton
      onPress={() =>
        !isFavorite ? addToFavorites(event) : removeFromFavorites(event)
      }
    >
      <AntDesign
        name={isFavorite ? "heart" : "hearto"}
        size={24}
        color={isFavorite ? "red" : "white"}
      />
    </FavoriteButton>
  );
};
