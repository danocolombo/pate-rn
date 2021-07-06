import * as firebase from "firebase";
import { Auth } from "aws-amplify";
export const loginRequest = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const cognitoLogin = (email, password) => Auth.signIn(email, password);
