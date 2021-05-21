import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { ThemeProvider } from "styled-components/native";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "./src/infrastructure/theme";
import { Lobby } from "./src/features/lobby/screens/lobby.screen";
import { Profile } from "./src/features/profile/screens/profile.screen";
function EventsScreen() {
  return <Lobby />;
}
function ProfileScreen() {
  return <Profile />;
}
const Tab = createBottomTabNavigator();

export default function App() {
  const [oswaldLoaded] = useOswald({ Oswald_400Regular });
  const [latoLoaded] = useLato({ Lato_400Regular });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Events") {
                  iconName = "event";
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
            <Tab.Screen name="Events" component={EventsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>

        <ExpoStatusBar style="auto" />
      </ThemeProvider>
    </>
  );
}
