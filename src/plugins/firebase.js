import firebase from "firebase";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  //   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
const myApp = firebase.initializeApp(firebaseConfig);
export const auth = myApp.auth();
export const firestore = myApp.firestore();
export const LOCAL_PERSISTENCE = firebase.auth.Auth.Persistence.LOCAL;
export const SESSION_PERSISTENCE = firebase.auth.Auth.Persistence.SESSION;
export const NONE_PERSISTENCE = firebase.auth.Auth.Persistence.NONE;
