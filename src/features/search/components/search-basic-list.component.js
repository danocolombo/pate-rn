import React from "react";
import { Text, StyleSheet } from "react-native";
export const BasicList = () => {
  return <Text style={styles.list}>Search List</Text>;
};
const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 16,
    backgroundColor: "blue",
  },
});
