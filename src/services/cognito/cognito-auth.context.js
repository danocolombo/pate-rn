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
  // const [userCreds setUserCreds] = useState();
  const [userProfile, setUserProfile] = useState();
  const [error, setError] = useState(null);

  // const setUserCreds = async (uData) => {
  //   setUser(uData);
  // };
  const onLogin = async (userName, password) => {
    setIsLoading(true);
    setError(null);
    let uid = "";
    try {
      await cognitoLogin(userName, password)
        .then((cognitoUser) => {
          // setUser(cognitoUser?.CognitoUser);
          async function setTheUser(cu) {
            setUser(cu);
          }
          setTheUser(cognitoUser);
          uid = cognitoUser?.attributes?.sub;
          // console.log("[--0009--] cognitoUser:\n", cognitoUser);
          // console.log("[--0010--] sub: ", cognitoUser?.attributes?.sub);
          // console.log("[--0011--] uid:\n", uid);
          // console.log("[--0010--] sub:", user.attributes.sub);
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
    console.log("[--0012--] uid:\n", uid);
    try {
      await getUserProfile(uid).then((profile) => {
        async function setProfileData(pd) {
          setUserProfile(pd?.Items[0]);
        }
        setProfileData(profile);
        // setUserProfile(profile);
        console.log("[--0013--] profile:\n", profile);
      });
    } catch (err) {
      console.log("error getting profile\n:", err);
    }
    setIsLoading(false);
    console.log("[--0014--] user:\n", user);
    console.log("[--0015--] profile:\n", userProfile);
    // console.log("[--0016--] count: \n");
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
