import React from "react";
import { Text } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { EventsScreen } from "../../features/events/screens/events.screen";
const EventStack = createStackNavigator();

export const EventsNavigator = () => {
  return (
    <EventStack.Navigator
      headerMode="none"
      screenOptions={{ ...TransitionPresets.ModalPresentationIOS }}
    >
      <EventStack.Screen name="Events" component={EventsScreen} />
      <EventStack.Screen
        name="EventDetail"
        component={() => <Text>Event Detail</Text>}
      />
    </EventStack.Navigator>
  );
};
