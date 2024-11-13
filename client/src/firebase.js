// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: "AIzaSyDQWRr1eBh6UICq42ZekWpUxETOPh57ppU",
    // authDomain: "b-vote.firebaseapp.com",
    // projectId: "b-vote",
    // storageBucket: "b-vote.appspot.com",
    // messagingSenderId: "108391650364",
    // appId: "1:108391650364:web:d683b4f16dd0daaf165f39"

  apiKey: "AIzaSyDzXCKswEcDyn-gJKzTb-43UO7-5yOLDl4",
  authDomain: "web3-voting-app-94c49.firebaseapp.com",
  projectId: "web3-voting-app-94c49",
  storageBucket: "web3-voting-app-94c49.firebasestorage.app",
  messagingSenderId: "23421265703",
  appId: "1:23421265703:web:7156785d10907e46a1eb02"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
// export const fbProvider = new FacebookAuthProvider();