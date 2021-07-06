import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppNavigator } from "./app.navigator";
import { AccountNavigator } from "./account.navigator";

import { CognitoAuthContext } from "../../services/cognito/cognito-auth.context";

export const Navigation = () => {
  const { isAuthenticated } = useContext(CognitoAuthContext);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};
