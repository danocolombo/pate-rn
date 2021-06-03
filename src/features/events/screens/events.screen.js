import React, { useContext } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { StatusBar } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
import { EventsContext } from "../../../services/events/events.context";
import { Search } from "../components/search.component";
import { RallyEvent } from "../components/rally-event-card.component";

const EventsSafeAreaView = styled.SafeAreaView`
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
const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const EventList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;
export const EventsScreen = () => {
  const { isLoading, error, events } = useContext(EventsContext);
  //next console.log should spit out the events defined in context.
  //console.log(error);
  //console.log(eventContext);

  return (
    <EventsSafeAreaView>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      )}
      <Search />
      <EventList
        data={events}
        renderItem={({ item }) => {
          return <RallyEvent rally={item} />;
        }}
        keyExtractor={(item) => item.uid}
      />
    </EventsSafeAreaView>
  );
};