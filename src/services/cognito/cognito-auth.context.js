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
  const [user, setUser] = useState();
  const [session, setSession] = useState();
  // const [cogUser, setCogUser] = useState({});
  const [cogSession, setCogSession] = useState({});
  const [error, setError] = useState(null);
  let cogUser = {};
  const saveCogUser = (cu) => {
    cogUser = {
      userName: cu.username,
      attributes: { sub: cu.attributes.sub, email: cu.attributes.email },
    };
  };
  const saveCogUserInfo = (cui) => {
    // const util = require("util");
    // console.log(
    //   "[--CUI--] cui:  \n" +
    //     util.inspect(cui, { showHidden: false, depth: null })
    // );
    cogUser = {
      id: cui.id,
      userName: cui.username,
      attributes: { sub: cui.attributes.sub, email: cui.attributes.email },
    };
    setUser(cogUser);
  };
  const saveCogCurrentSession = (cs) => {
    // const util = require("util");
    // console.log(
    //   "[--CS--] cs:  \n" + util.inspect(cs, { showHidden: false, depth: null })
    // );
    setSession(cs);
  };
  const onLogin = async (userName, password) => {
    console.log("new login. will go to cognitoLogin soon");
    setIsLoading(true);
    try {
      await cognitoLogin(userName, password)
        .then((cognitoUser) => {
          // console.log("cognitoUser:\n", cognitoUser);
          // saveCogUser(cognitoUser);
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
          }
          // let currentUserInfo = {};
          // let currentSession = {};
          // await Auth.currentUserInfo().then((u) => {
          //   currentUserInfo = u;
          // });
          // saveUserInfo(currentUserInfo);
          // currentSession = Auth.currentSession();
          // saveCurrentSession(currentSession);
          // async function getSession() {
          //   await cognitoCurrentSession().then((cs) => {
          //     currentSession = cs;
          //     // setCogSession(cs);
          //   });
          // }
          // getSession();
          // setUser(currentUserInfo);
          // setSession(currentSession);
          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);
          setError(e);
          console.log("failed login:\n", e);
        });
      // let currentUserInfo = {};
      // let currentSession = {};
      await Auth.currentUserInfo().then((cui) => {
        saveCogUserInfo(cui);
      });

      await Auth.currentSession().then((cs) => {
        saveCogCurrentSession(cs);
      });
    } catch (err) {
      switch (err) {
        case "No current user":
          setError("Authentication failed. Please check your credentials");
          break;
        default:
          setError("Unknown error signing in.[" + error + "]");
          break;
      }
    }
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
