import React from "react";
import styled from "styled-components/native";
import { StyleSheet, View, SafeAreaView, StatusBar } from "react-native";
import { BasicList } from "../components/search-basic-list.component";
import { Searchbar } from "react-native-paper";
const SearchSafeAreaView = styled.SafeAreaView`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;
const SearchBarView = styled.View`
  padding: 16px;
  background-color: green;
`;
const SearchListContainer = styled.View`
  padding: 16px;
`;
export const BasicSearch = () => {
  return (
    <SearchSafeAreaView>
      <SearchBarView>
        <Searchbar />
      </SearchBarView>
      <SearchListContainer>
        <BasicList />
      </SearchListContainer>
    </SearchSafeAreaView>
  );
};
