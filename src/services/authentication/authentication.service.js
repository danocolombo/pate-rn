import * as firebase from "firebase";

const loginRequest = (email, password) => {
  firebase.auth().signInWIthEmailAndPassword(email, password);
};
