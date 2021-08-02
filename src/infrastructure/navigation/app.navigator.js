import React, { useContext } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { EventsNavigator } from "../navigation/events.navigator";
import { SettingsNavigator } from "../navigation/settings.navigator";
import { StorageContextProvider } from "../../services/storage/storage.context";
import { EventsContextProvider } from "../../services/events/events.context";
import { RegistrationsContextProvider } from "../../services/registrations/registrations.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { FavoritesContextProvider } from "../../services/favorites/favorites.context";
import { CognitoAuthContext } from "../../services/cognito/cognito-auth.context";
//import { SafeArea } from "../../components/utility/safe-area.component";
import { MapScreen } from "../../features/map/screens/map.screen";
const Tab = createBottomTabNavigator();

// function ProfileScreen() {
//   return <Profile />;
// }

export const AppNavigator = () => {
  const { userProfile } = useContext(CognitoAuthContext);
  return (
    <FavoritesContextProvider>
      <StorageContextProvider>
        <LocationContextProvider>
          <EventsContextProvider>
            <RegistrationsContextProvider>
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === "Events") {
                      iconName = "event";
                    } else if (
                      route.name === "Serve" &&
                      (userProfile?.stateRep || userProfile?.stateLead)
                    ) {
                      iconName = "volunteer-activism";
                    } else if (route.name === "Profile") {
                      iconName = "settings";
                    }
                    // You can return any component that you like here!
                    return (
                      <>
                        <MaterialIcons
                          name={iconName}
                          size={size}
                          color={color}
                        />
                      </>
                    );
                  },
                })}
                tabBarOptions={{
                  activeTintColor: "blue",
                  inactiveTintColor: "gray",
                }}
              >
                {/* the following order is the order on bottom and default is first screen */}
                <Tab.Screen name="Events" component={EventsNavigator} />
                {userProfile?.stateRep || userProfile?.stateLead ? (
                  <Tab.Screen name="Serve" component={MapScreen} />
                ) : null}
                <Tab.Screen name="Profile" component={SettingsNavigator} />
              </Tab.Navigator>
            </RegistrationsContextProvider>
          </EventsContextProvider>
        </LocationContextProvider>
      </StorageContextProvider>
    </FavoritesContextProvider>
  );
};
