import React, { useState, createContext } from "react";
import { Auth } from "aws-amplify";

// import { loginRequest } from "./authentication.service";

export const CognitoAuthContext = createContext();

export const CognitoAuthContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  //   const onLogin1 = (email, password) => {
  //     setIsLoading(true);
  //     loginRequest(email, password)
  //       .then((u) => {
  //         setUser(u);
  //         setIsLoading(false);
  //       })
  //       .catch((e) => {
  //         setIsLoading(false);
  //         setError(e.toString());
  //       });
  //   };
  const onLogin = (email, password) => {
    setIsLoading(true);
    let alertPayload = {};
    Auth.signIn(email, password)
      .then((u) => {
        if (u.challengeName === "NEW_PASSWORD_REQUIRED") {
          //const { requiredAttributes } = u.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
          Auth.completeNewPassword(
            email, // the Cognito User Object
            password,
            []
            // the new password
            // OPTIONAL, the required attributes
            // {
            //     email: 'xxxx@example.com',
            //     phone_number: '1234567890'
            // }
          )
            .then((u) => {
              // at this time the user is logged in if no MFA required
              console.log(u);
            })
            .catch((e) => {
              alertPayload = {
                msg: "Authentication failed. Please check your credentials",
                alertType: "danger",
              };
              console.log(alertPayload);
              //   setAlert(alertPayload);
              return;
            });
        } else {
          // the user is good to go....
        }
      })
      .catch((e) => {
        switch (e.code) {
          case "UserNotFoundException":
            alertPayload = {
              msg: e.message,
              alertType: "danger",
            };
            break;
          case "PasswordResetRequiredException":
            alertPayload = {
              msg: e.message,
              alertType: "danger",
            };
            break;
          default:
            alertPayload = {
              msg: "Signin error: [" + e.message + "]",
              alertType: "danger",
            };
            break;
        }
        console.log(alertPayload);
        //setAlert(alertPayload);
        return;
      });
  };

  const onRegister = (email, password, repeatedPassword) => {
    //     //need to validate request before automatically adding user
    //     if (password !== repeatedPassword) {
    //       setError("Error: passwords do not match");
    //       return;
    //     }
    //     firebase
    //       .auth()
    //       .createUserWithEmailAndPassword(email, password)
    //       .then((u) => {
    //         setUser(u);
    //         setIsLoading(false);
    //       })
    //       .catch((e) => {
    //         setIsLoading(false);
    //         setError(e.toString());
    //       });
    console.log("onRegister not implemented yet");
  };
  const onLogout = () => {
    setUser(null);
    // firebase.auth().signOut();
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
