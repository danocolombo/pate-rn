import React, { useContext } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { EventsContext } from "../../../services/events/events.context";
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
const EventList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;
export const Lobby = () => {
  const eventContext = useContext(EventsContext);
  const { isLoading, error, events } = useContext(EventsContext);
  console.log(error);
  console.log(eventContext);
  return (
    <LobbySafeAreaView>
      <SearchArea>
        <Searchbar />
      </SearchArea>
      <EventList
        data={events}
        renderItem={({ item }) => {
          return <RallyEvent rally={item} />;
        }}
        keyExtractor={(item) => item.uid}
      />
    </LobbySafeAreaView>
  );
};
