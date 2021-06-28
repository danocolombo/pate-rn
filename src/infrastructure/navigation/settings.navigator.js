import React, { useEffect } from "react";
import { SettingsScreen } from "../../features/settings/screens/settings.screen";
import { ProfileScreen } from "../../features/profile/screens/profile.screen";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { Settings } from "react-native";

const SettingsStack = createStackNavigator();

export const SettingsNavigator = ({ route, navigation }) => {
  return (
    <SettingsStack.Navigator
      headerMode="screen"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SettingsStack.Screen
        options={{
          header: () => null,
        }}
        name="Settings"
        component={SettingsScreen}
      />
      <SettingsStack.Screen options={{ header: () => null, }} name="Profile" component={ProfileScreen} />
      {/*<SettingsStack.Screen name="Favorites" component={() => null} /> */}
    </SettingsStack.Navigator>
  );
};
