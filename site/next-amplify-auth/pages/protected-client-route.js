import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";

/*
If you try to access the protected client route you will be automatically redirected to the profile route if you are not authenticated, and allowed to view the page if you are authenticated.
*/
function ProtectedClient() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => setUser(user))
      // if there is no authenticated user, redirect to profile page
      .catch(() => router.push("/profile"));
  }, []);
  if (!user) return null;
  return <h1>Hello {user.username} from client route!</h1>;
}

export default ProtectedClient;
