import React, { useState, createContext } from "react";
import { Auth } from "aws-amplify";
import {
  cognitoLogin,
  cognitoCompleteNewPassword,
  getUserProfile,
} from "./cognito-auth.service";
export const CognitoAuthContext = createContext();

export const CognitoAuthContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();
  const [userProfile, setUserProfile] = useState();
  const [error, setError] = useState(null);

  const onLogin = async (userName, password) => {
    setIsLoading(true);
    setError(null);
    try {
      await cognitoLogin(userName, password)
        .then((cognitoUser) => {
          if (cognitoUser.challengeName === "NEW_PASSWORD_REQUIRED") {
            const { requiredAttributes } = cognitoUser.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
            cognitoCompleteNewPassword(
              userName, // the Cognito User Object
              password,
              []
            )
              .then((cognitoUserPasswordUpdated) => {
                // at this time the user is logged in if no MFA required
                console.log(cognitoUserPasswordUpdated);
              })
              .catch((e) => {
                const alertPayload = {
                  msg: "Authentication failed. Please check your credentials",
                  alertType: "danger",
                };
                // setAlert(alertPayload);
                console.log("ERROR:\n", alertPayload);
                return;
              });
          }
          setIsLoading(false);
        })
        .catch((e) => {
          setUser(null);
          setIsLoading(false);
          switch (e.code) {
            case "UserNotFoundException":
              setError(e.message);
              break;
            default:
              setError("Login Error");
              break;
          }
          setError(e.message);
          console.log("failed cognitoLogin:\n", e);
        });
    } catch (err) {
      console.log("OUCH");
    }
  };
  const onRegister = (email, password, repeatedPassword) => {
    //need to validate request before automatically adding user
    if (password !== repeatedPassword) {
      setError("Error: passwords do not match");
      return;
    }
    console.log("REGISTRATION NOT IMPLEMENTED YET ON APP");
  };
  const onLogout = () => {
    setUser(null);
    Auth.signOut();
  };
  return (
    <CognitoAuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        userProfile,
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
