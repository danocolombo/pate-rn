import React, { useState, createContext } from "react";
import * as firebase from "firebase";

import { loginRequest } from "./cognito-auth.service";
import { cognitoLogin } from "./cognito-auth.service";
export const CognitoAuthContext = createContext();

export const CognitoAuthContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const onLogin = (email, password) => {
    console.log("new login. will go to cognitoLogin soon");
    // setIsLoading(true);
    cognitoLogin(email, password)
      .then((u) => {
        console.log("successfully logged in");
      })
      .catch((e) => {
        console.log("failed login:\n", e);
      });
  };

  const onLogin1 = (userName, password) => {
    setIsLoading(true);
    loginRequest(userName, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };
  const onRegister = (email, password, repeatedPassword) => {
    //need to validate request before automatically adding user
    if (password !== repeatedPassword) {
      setError("Error: passwords do not match");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };
  const onLogout = () => {
    setUser(null);
    firebase.auth().signOut();
  };
  return (
    <CognitoAuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </CognitoAuthContext.Provider>
  );
};
