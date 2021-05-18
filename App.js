import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import { BasicSearch } from "./src/features/search/screens/search-basic.screen";
import { Lobby } from "./src/features/lobby/screens/lobby.screen";
export default function App() {
  return (
    <View>
      <BasicSearch />
      <Lobby />
      <ExpoStatusBar style="auto" />
    </View>
  );
}
