import * as firebase from "firebase";

export const loginRequest = (email, password) => {
  firebase.auth().signInWIthEmailAndPassword(email, password);
};
