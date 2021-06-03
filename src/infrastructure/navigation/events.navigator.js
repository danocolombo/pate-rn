import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { EventsScreen } from "../../features/events/screens/events.screen";
const EventStack = createStackNavigator();

export const EventsNavigator = () => {
  return (
    <EventStack.Navigator headerMode="none">
      <EventStack.Screen name="Events" component={EventsScreen} />
    </EventStack.Navigator>
  );
};
