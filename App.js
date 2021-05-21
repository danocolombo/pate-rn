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
          <Tab.Navigator>
            <Tab.Screen name="Home" component={EventsScreen} />
            <Tab.Screen name="Settings" component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>

        <ExpoStatusBar style="auto" />
      </ThemeProvider>
    </>
  );
}
