import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { EventsNavigator } from "../navigation/events.navigator";
import { SettingsNavigator } from "../navigation/settings.navigator";
import { EventsContextProvider } from "../../services/events/events.context";
import { RegistrationsContextProvider } from "../../services/registrations/registrations.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { FavoritesContextProvider } from "../../services/favorites/favorites.context";

//import { SafeArea } from "../../components/utility/safe-area.component";
import { MapScreen } from "../../features/map/screens/map.screen";
const Tab = createBottomTabNavigator();

// function ProfileScreen() {
//   return <Profile />;
// }

export const AppNavigator = () => {
  return (
    <FavoritesContextProvider>
      <LocationContextProvider>
        <EventsContextProvider>
          <RegistrationsContextProvider>
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
                  return (
                    <MaterialIcons name={iconName} size={size} color={color} />
                  );
                },
              })}
              tabBarOptions={{
                activeTintColor: "blue",
                inactiveTintColor: "gray",
              }}
            >
              <Tab.Screen name="Events" component={EventsNavigator} />
              <Tab.Screen name="Map" component={MapScreen} />
              <Tab.Screen name="Profile" component={SettingsNavigator} />
            </Tab.Navigator>
          </RegistrationsContextProvider>
        </EventsContextProvider>
      </LocationContextProvider>
    </FavoritesContextProvider>
  );
};
