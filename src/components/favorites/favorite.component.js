import React, { useContext } from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import { FavoritesContext } from "../../services/favorites/favorites.context";

const FavoriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 9;
`;

export const Favorite = ({ event }) => {
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);

  const isFavorite = favorites.find((e) => e.uid === event.uid);

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

// import React, { useContext } from "react";
// import styled from "styled-components/native";
// import { AntDesign } from "@expo/vector-icons";
// import { TouchableOpacity } from "react-native";
// import { FavoritesContext } from "../../services/favorites/favorites.context";

// const FavoriteButton = styled(TouchableOpacity)`
//   position: absolute;
//   top: 3px;
//   right: 5px;
//   z-index: 9;
// `;

// export const Favorite = ({ event }) => {
//   const { favorites, addToFavorites, removeFromFavorites } =
//     useContext(FavoritesContext);
//   console.log("FAVORITES:\n", favorites);
//   console.log("EVENT:\n", event);
//   console.log("favorites.length:" + favorites.length);
//   if (favorites.length === 0) {
//     return true;
//   }
//   const isFavorite0 = favorites.find((e) => e.uid === event.uid);
//   const isFavorite = () => {
//     console.log("event:", event);
//     favorites ? favorites.find((e) => e.uid === event.uid) : false;
//   };

//   return (
//     <FavoriteButton
//       onPress={() =>
//         !isFavorite ? addToFavorites(event) : removeFromFavorites(event)
//       }
//     >
//       <AntDesign
//         name={isFavorite ? "heart" : "hearto"}
//         size={24}
//         color={isFavorite ? "red" : "white"}
//       />
//     </FavoriteButton>
//   );
// };
