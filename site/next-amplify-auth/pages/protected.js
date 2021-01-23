import { withSSRContext } from "aws-amplify";

/*
This is used without redirects. A more secure way is using SSR and server side redirects.
*/
function Protected({ authenticated, username }) {
  if (!authenticated) {
    return <h1>Not authenticated</h1>;
  }
  return <h1>Hello {username} from SSR route!</h1>;
}

export async function getServerSideProps(context) {
  const { Auth } = withSSRContext(context);
  try {
    // Access the user session on the server
    const user = await Auth.currentAuthenticatedUser();
    console.log("user: ", user);
    return {
      props: {
        authenticated: true,
        username: user.username,
      },
    };
  } catch (err) {
    return {
      props: {
        authenticated: false,
      },
    };
  }
}

export default Protected;
