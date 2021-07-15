import React, { useState, createContext } from "react";
import * as firebase from "firebase";
import { Auth } from "aws-amplify";
//import { loginRequest } from "./cognito-auth.service";
import {
  cognitoLogin,
  cognitoCompleteNewPassword,
} from "./cognito-auth.service";
export const CognitoAuthContext = createContext();

export const CognitoAuthContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();
  const [session, setSession] = useState();
  // const [cogUser, setCogUser] = useState(false);
  const [error, setError] = useState(null);

  // const saveCogUser = (cu) => {
  //   cogUser = {
  //     userName: cu.username,
  //     attributes: { sub: cu.attributes.sub, email: cu.attributes.email },
  //   };
  // };
  const saveCogUserInfo = (cui) => {
    // const util = require("util");
    // console.log(
    //   "[--CUI--] cui:  \n" +
    //     util.inspect(cui, { showHidden: false, depth: null })
    // );
    let cUser = {};
    cUser = {
      id: cui.id,
      userName: cui.username,
      attributes: { sub: cui.attributes.sub, email: cui.attributes.email },
    };
    setUser(cUser);
  };
  const saveCogCurrentSession = (cs) => {
    // const util = require("util");
    // console.log(
    //   "[--CS--] cs:  \n" + util.inspect(cs, { showHidden: false, depth: null })
    // );
    setSession(cs);
  };
  const onLogin = async (userName, password) => {
    setIsLoading(true);
    setError(null);
    try {
      await cognitoLogin(userName, password)
        .then((cognitoUser) => {
          // console.log("cognitoUser:\n", cognitoUser);
          // saveCogUser(cognitoUser);
          // const util = require("util");
          // console.log(
          //   "[--0000--] cognitoUser (response):  \n" +
          //     util.inspect(cognitoUser, { showHidden: false, depth: null })
          // );
          setUser(cognitoUser);
          // setCogUser(true);
          // if (cogUser === false) {
          // setCogUser(true);
          // }
          console.log("[--0001--] user: ", user);
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
      // let currentUserInfo = {};
      // let currentSession = {};
      // if (user) {
      //   await Auth.currentUserInfo()
      //     .then((cui) => {
      //       saveCogUserInfo(cui);
      //     })
      //     .catch((e) => {
      //       setIsLoading(false);
      //       // setError(e);
      //       console.log("failed currentUserInfo inquiry:\n", e);
      //     });
      // }
      // if (cogUser) {
      //   await Auth.currentSession()
      //     .then((cs) => {
      //       saveCogCurrentSession(cs);
      //     })
      //     .catch((e) => {
      //       setIsLoading(false);
      //       setError(e.toString());
      //     });
      // }
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
    Auth.signOut();
    // firebase.auth().signOut();
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
