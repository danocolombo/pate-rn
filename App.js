import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components/native";
import * as firebase from "firebase";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { theme } from "./src/infrastructure/theme";

import { Navigation } from "./src/infrastructure/navigation";

//++++++++++++++++++++++
// CONTEXT FOR APP
//++++++++++++++++++++++
import { EventsContextProvider } from "./src/services/events/events.context";
import { LocationContextProvider } from "./src/services/location/location.context";
import { FavoritesContextProvider } from "./src/services/favorites/favorites.context";
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA1BXUGHDi7MAiSUp47F3956qeXjSOB-Gw",
  authDomain: "pate-rn.firebaseapp.com",
  projectId: "pate-rn",
  storageBucket: "pate-rn.appspot.com",
  messagingSenderId: "20273787715",
  appId: "1:20273787715:web:d7800b3d912e36290735f6",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    firebase
      .auth()
      .signInWithEmailAndPassword("fortsonguru@gmail.com", "test123")
      .then((user) => {
        console.log("FIREBASE_USER: authenticated");
        setIsAuthenticated(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const [oswaldLoaded] = useOswald({ Oswald_400Regular });
  const [latoLoaded] = useLato({ Lato_400Regular });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <FavoritesContextProvider>
          <LocationContextProvider>
            <EventsContextProvider>
              <Navigation />
            </EventsContextProvider>
          </LocationContextProvider>
          <ExpoStatusBar style="auto" />
        </FavoritesContextProvider>
      </ThemeProvider>
    </>
  );
}
