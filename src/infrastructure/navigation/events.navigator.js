import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { EventsScreen } from "../../features/events/screens/events.screen";
import { EventDetailScreen } from "../../features/events/screens/event-detail.screen";
const EventStack = createStackNavigator();

export const EventsNavigator = () => {
  return (
    <EventStack.Navigator
      headerMode="none"
      screenOptions={{ ...TransitionPresets.ModalPresentationIOS }}
    >
      <EventStack.Screen name="Events" component={EventsScreen} />
      <EventStack.Screen name="EventDetail" component={EventDetailScreen} />
    </EventStack.Navigator>
  );
};
