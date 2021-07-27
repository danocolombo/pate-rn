import * as firebase from "firebase";
import { Auth } from "aws-amplify";
export const loginRequest = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const cognitoLogin = (email, password) => Auth.signIn(email, password);
export const cognitoCompleteNewPassword = (userName, password, []) =>
  Auth.completeNewPassword(userName, password, []);

export const cognitoCurrentUserInfo = () => Auth.currentUserInfo();
export const cognitoCurrentSession = () => Auth.currentSession();
export const getUserProfile = (uid) => {
  //========================================
  // this function will get the user profile info from DDB and return it
  //========================================
  return new Promise((resolve, reject) => {
    fetch("https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/users", {
      method: "POST",
      body: JSON.stringify({
        operation: "getUser",
        payload: {
          uid: uid,
        },
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data.body);
      });
  });
};
