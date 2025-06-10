// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCNDeuXiPNITzHVO_FaiY-GfILROIlT2M",
  authDomain: "authentication-db-70ccb.firebaseapp.com",
  databaseURL: "https://authentication-db-70ccb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "authentication-db-70ccb",
  storageBucket: "authentication-db-70ccb.firebasestorage.app",
  messagingSenderId: "742683453041",
  appId: "1:742683453041:web:3d187bc78f3f462dad1dd0",
  measurementId: "G-C8EKF45T5X"
};

// Initialize Firebase
const cong = initializeApp(firebaseConfig);

export default cong;
// Now you can use Firebase services in your React app!