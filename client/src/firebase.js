
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCo6VFI4YFVH0Stb62ULAPh-8t7lg0Ko6w",
  authDomain: "video-c9079.firebaseapp.com",
  projectId: "video-c9079",
  storageBucket: "video-c9079.appspot.com",
  messagingSenderId: "717232312123",
  appId: "1:717232312123:web:cbb8cf406afdfe9f75f11e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;