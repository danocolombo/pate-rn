import React from "react";
import { StyleSheet, View, SafeAreaView, StatusBar } from "react-native";
import { RallyEvent } from "../components/rally-event.component";
import { Searchbar } from "react-native-paper";
export const Lobby = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search}>
        <Searchbar />
      </View>
      <RallyEvent />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  search: {
    padding: 16,
    backgroundColor: "green",
  },
  list: {
    flex: 1,
    padding: 16,
    backgroundColor: "blue",
  },
});
