import React, { useContext, useEffect } from "react";
import { StatusBar, FlatList, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { ActivityIndicator, Colors } from "react-native-paper";
import { Favorite } from "../../../components/favorites/favorite.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { EventsContext } from "../../../services/events/events.context";
import { FavoritesContext } from "../../../services/favorites/favorites.context";
import { Search } from "../components/search.component";
import { EventInfoCard } from "../components/event-card.component";
import { EventList } from "../components/event-list.styles";

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

// export const EventList = styled(FlatList).attrs({
//   contentContainerStyle: {
//     padding: 16,
//   },
// })``;
export const EventsScreen = ({ navigation }) => {
  const { isLoading, events, loadNoEvents } = useContext(EventsContext);
  const { favorites } = useContext(FavoritesContext);

  //next console.log should spit out the events defined in context.
  //console.log(error);
  // console.log(eventContext);
  // console.log("NAVIGATION:", navigation);
  // console.log("EVENTS:", events);
  useEffect(() => {
    //check the number of events available to display
    // console.log("[--0003--] events.screen:\n", events);
    // console.log("[--0004--] event count: ", events.length);
    // if (events.length < 1){
    //   //need to put generic "no events" into events array
    //   async function notifyNone() {
    //     loadNoEvents();
    //   }
    //   notifyNone();
    // }
  }, []);
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
          //console.log("[--ITEM--]", item);
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EventDetail", { rally: item })
              }
            >
              <Spacer position="bottom" size="large">
                <EventInfoCard rally={item} />
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.uid}
      />
    </EventsSafeAreaView>
  );
};
