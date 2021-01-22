import "@styles/globals.css";
import { FirebaseProvider } from "firebase-react-provider";

/* Replace the config values with your firebase config */
const config = {
  apiKey: "AIzaSyBT3uEGmRADTBwE0lY7WKv-fk6l33fHILc",
  authDomain: "garden-posts-demo.firebaseapp.com",
  databaseURL: "https://garden-posts-demo.firebaseio.com",
  projectId: "garden-posts-demo",
  // storageBucket: "garden-posts-demo.appspot.com",
  appId: "1:316947097235:web:7bca27def6b7275d658f66",
  measurementId: "G-PX67HVDJLX",
};

function Application({ Component, pageProps }) {
  return (
    <FirebaseProvider config={config}>
      <Component {...pageProps} />
    </FirebaseProvider>
  );
}

export default Application;
