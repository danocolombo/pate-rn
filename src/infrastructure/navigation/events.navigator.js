import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { Lobby } from "../../features/lobby/screens/lobby.screen";
const EventStack = createStackNavigator();

export const EventsNavigator = () => {
  return (
    <EventStack.Navigator>
      <EventStack.Screen>
        <Lobby name="Events" component={RallyScreen} />
      </EventStack.Screen>
    </EventStack.Navigator>
  );
};
