import * as firebase from "firebase";
import { Auth } from "aws-amplify";
export const loginRequest = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const cognitoLogin = (email, password) => Auth.signIn(email, password);
export const cognitoCompleteNewPassword = (userName, password, []) =>
  Auth.completeNewPassword(userName, password, []);

export const cognitoCurrentUserInfo = () => Auth.currentUserInfo();
export const cognitoCurrentSession = () => Auth.currentSession();
