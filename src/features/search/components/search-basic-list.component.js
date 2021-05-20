import React from "react";
import styled from "styled-components/native";
import { Text, StyleSheet } from "react-native";

const SearchList = styled.Text`
  flex: 1;
  padding: 16px;
  background-color: white;
`;
export const BasicList = () => {
  return <SearchList>Search List</SearchList>;
};
