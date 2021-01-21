import "@styles/globals.css";
import { FirebaseProvider } from "firebase-react-provider";

/* Replace the config values with your firebase config */
const config = {
  apiKey: "AIza...................................",
  authDomain: "your-app-name.firebaseapp.com",
  databaseURL: "https://your-app-name.firebaseio.com",
  projectId: "your-app-name",
  // storageBucket: "your-app-name.appspot.com",
};

function Application({ Component, pageProps }) {
  return (
    <FirebaseProvider config={config}>
      <Component {...pageProps} />
    </FirebaseProvider>
  );
}

export default Application;
