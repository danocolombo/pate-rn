import React, { useContext } from "react";
import { StatusBar, FlatList, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { ActivityIndicator, Colors } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { EventsContext } from "../../../services/events/events.context";
import { Search } from "../components/search.component";
import { RallyEvent } from "../components/rally-event-card.component";

const EventsSafeAreaView = styled.SafeAreaView`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
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
export const EventsScreen = ({ navigation }) => {
  const { isLoading, events } = useContext(EventsContext);
  //next console.log should spit out the events defined in context.
  //console.log(error);
  //console.log(eventContext);
  //console.log(navigation);
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
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("EventDetail")}
            >
              <Spacer position="bottom" size="large">
                <RallyEvent rally={item} />
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.uid}
      />
    </EventsSafeAreaView>
  );
};
