// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhES8wK40bj40z2oNufdyDJSwUh4KHZV0",
  authDomain: "searchwizzard.firebaseapp.com",
  projectId: "searchwizzard",
  storageBucket: "searchwizzard.appspot.com",
  messagingSenderId: "182538045290",
  appId: "1:182538045290:web:0f3e7a5a1dff52262ec713",
  measurementId: "G-847Z330RP0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);