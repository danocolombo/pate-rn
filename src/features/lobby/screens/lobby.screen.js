import React from "react";
import styled from "styled-components/native";
import { StatusBar } from "react-native";
import { RallyEvent } from "../components/rally-event-card.component";
import { Searchbar } from "react-native-paper";

const LobbySafeAreaView = styled.SafeAreaView`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;
const SearchArea = styled.View`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;
const RallyList = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
export const Lobby = () => {
  return (
    <LobbySafeAreaView>
      <SearchArea>
        <Searchbar />
      </SearchArea>
      <RallyList>
        <RallyEvent />
      </RallyList>
    </LobbySafeAreaView>
  );
};
