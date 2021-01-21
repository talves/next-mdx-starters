/*
  const name = "app-name" // name used in the provider or optional
  const { authApp, authConstructor } = useFirebaseAuth(name || undefined)
  authApp = firebase.auth(app)
  authConstructor = firebase.auth
*/
import React from "react";
import {
  useFirebaseAuth,
  useFirebaseUser,
  usePrevious,
} from "firebase-react-provider";

const LoggedInUser = ({ children, isLoggedIn = Boolean(false), onClick }) => {
  const LogoutButton = ({ onClick }) => {
    return <button onClick={onClick}>Logout</button>;
  };
  if (typeof onClick !== "function") {
    throw Error("LoggedInUser must pass onClick");
  }

  return isLoggedIn ? <LogoutButton onClick={onClick} /> : null;
};

const LoggedOutUser = ({ isLoggedIn = Boolean(false), onClick }) => {
  const LoginButton = ({ onClick }) => {
    return <button onClick={onClick}>Login</button>;
  };
  if (typeof onClick !== "function") {
    throw Error("LoggedOutUser must pass onClick");
  }

  return !isLoggedIn ? <LoginButton onClick={onClick} /> : null;
};

export function LoginComponent({ children, name }) {
  const { appAuth, authConstructor } = useFirebaseAuth(
    name /* name of your app if assigned in the provider */
  );
  const user = useFirebaseUser(
    name /* name of your app if assigned in the provider */
  );
  const [userName, setUserName] = React.useState(
    (user && (user.displayName || "No Name")) || null
  );
  const previousUserName = usePrevious(userName);
  const [inProcess, setInProcess] = React.useState(null);

  function handleLogout(event) {
    setInProcess(true);
    event.preventDefault();
    const button = event.currentTarget;
    button.disabled = true;
    button.textContent = "Logging Out...";
    return appAuth
      .signOut()
      .then(() => {
        setInProcess(false);
      })
      .catch(function (error) {
        // An error happened.
      });
  }

  function handleLogin(event) {
    setInProcess(true);
    event.preventDefault();
    const button = event.currentTarget;
    button.disabled = true;
    button.textContent = "Logging In...";
    appAuth
      .setPersistence(authConstructor.Auth.Persistence.LOCAL)
      .then(function () {
        // We will use the google Provider
        var provider = new authConstructor.GoogleAuthProvider();
        // New sign-in will be persisted for any session instance.
        // Each new login will force an account selection, unless already logged in
        provider.setCustomParameters({
          prompt: "select_account",
        });
        return appAuth
          .signInWithPopup(provider)
          .then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // const token = result.credential.accessToken
            // The signed-in user info.
            const user = result.user;
            const name = (user && user.displayName) || null;
            setUserName(name);
            // ...
            console.log("results", result, name);
          })
          .catch(function (error) {
            throw error;
          });
      })
      .catch(function (error) {
        // Handle Errors here.
        // See https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithpopup
        if ((error.code = "auth/popup-closed-by-user")) {
          setInProcess(false);
        } else {
          // var errorCode = error.code
          // var errorMessage = error.message
          throw new Error(error.message);
        }
      });
  }

  React.useEffect(() => {
    const name = (user && user.displayName) || null;
    if (name !== previousUserName) setUserName(name);
  }, [user, previousUserName]);

  React.useEffect(() => {
    // stillWaiting is defined by auth being setup
    // once the user changes we cancel inProcess
    const stillWaiting = !(appAuth && authConstructor);
    if (stillWaiting) return;
    setInProcess(false);
  }, [user, appAuth, authConstructor]);

  return (
    <div style={{ height: "200px" }}>
      {inProcess || inProcess === null ? (
        <div>Waiting...</div>
      ) : (
        <div>
          <div>{children}</div>
          <LoggedInUser isLoggedIn={!!userName} onClick={handleLogout} />
          <LoggedOutUser isLoggedIn={!!userName} onClick={handleLogin} />
        </div>
      )}
    </div>
  );
}
