import React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { EventsNavigator } from "../navigation/events.navigator";

// import { Lobby } from "../../features/lobby/screens/lobby.screen";
import { Profile } from "../../features/profile/screens/profile.screen";
import { SafeArea } from "../../components/utility/safe-area.component";

const Tab = createBottomTabNavigator();
const TAB_ICON = {
  Events: "calendar",
  Map: "md-map",
  Settings: "md-settings",
};

function EventsScreen() {
  return <Lobby />;
}
const Map = () => (
  <SafeArea>
    <Text>Map</Text>
  </SafeArea>
);

function ProfileScreen() {
  return <Profile />;
}

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Events") {
              iconName = "event";
            } else if (route.name === "Map") {
              iconName = "map";
            } else if (route.name === "Profile") {
              iconName = "settings";
            }
            // You can return any component that you like here!
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "blue",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Events" component={EventsNavigator} />
        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
