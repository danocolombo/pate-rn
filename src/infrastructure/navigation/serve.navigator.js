import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { ServeScreen } from "../../features/events/screens/events.screen";
import { EventDetailScreen } from "../../features/events/screens/event-detail.screen";
const ServeStack = createStackNavigator();

export const ServeNavigator = () => {
  return (
    <ServeStack.Navigator
      headerMode="none"
      screenOptions={{ ...TransitionPresets.ModalPresentationIOS }}
    >
      <ServeStack.Screen name="Events" component={ServeScreen} />
      <ServeStack.Screen name="EventDetail" component={EventDetailScreen} />
    </ServeStack.Navigator>
  );
};
