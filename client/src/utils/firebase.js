
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interview-agent-810a7.firebaseapp.com",
  projectId: "interview-agent-810a7",
  storageBucket: "interview-agent-810a7.firebasestorage.app",
  messagingSenderId: "306527704440",
  appId: "1:306527704440:web:3d4e224edb6b33b717648d"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export { auth, provider }