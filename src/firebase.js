// Import the functions you need from the SDKs you need
import { getStorage } from "firebase/storage";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCBCmAAEzGNthsq9CWKYLUelPuVDfd6OvU',
    authDomain: 'housefind-88ebb.firebaseapp.com',
    projectId: "housefind-88ebb",
    storageBucket: "housefind-88ebb.appspot.com"
};
// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
  };