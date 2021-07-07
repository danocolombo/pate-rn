import React, { useState, createContext } from "react";
import * as firebase from "firebase";
import { Auth } from "aws-amplify";
//import { loginRequest } from "./cognito-auth.service";
import {
  cognitoLogin,
  loginRequest,
  cognitoCompleteNewPassword,
  cognitoCurrentUserInfo,
  cognitoCurrentSession,
} from "./cognito-auth.service";
export const CognitoAuthContext = createContext();

export const CognitoAuthContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  const onLogin = (userName, password) => {
    console.log("new login. will go to cognitoLogin soon");
    setIsLoading(true);
    cognitoLogin(userName, password)
      .then((cognitoUser) => {
        if (cognitoUser.challengeName === "NEW_PASSWORD_REQUIRED") {
          const { requiredAttributes } = cognitoUser.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
          cognitoCompleteNewPassword(
            userName, // the Cognito User Object
            password,
            []
            // the new password
            // OPTIONAL, the required attributes
            // {
            //     email: 'xxxx@example.com',
            //     phone_number: '1234567890'
            // }
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
        } else {
          // the user is good to go....
          console.log("successfully logged in");
          // console.log("cognitoUser:\n", cognitoUser);
          let currentUserInfo = {};
          let currentSession = {};
          async function getCurrentUserInfo() {
            cognitoCurrentUserInfo.then((cui) => {
              currentUserInfo = cui;
            });
          }
          getCurrentUserInfo();
          async function getCurrentSession() {
            cognitoCurrentSession.then((cs) => {
              currentSession = cs;
            });
          }
          getCurrentSession();

          setUser(currentUserInfo);
          setSession(currentSession);
          setIsLoading(false);
        }

        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
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
        session,
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
