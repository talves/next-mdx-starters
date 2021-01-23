import { withSSRContext } from "aws-amplify";

function Protected({ username }) {
  return <h1>Hello {username} from SSR route!</h1>;
}

/*
A more secure way is using SSR and server side redirects.
*/
export async function getServerSideProps({ req, res }) {
  const { Auth } = withSSRContext({ req });
  try {
    const user = await Auth.currentAuthenticatedUser();
    return {
      props: {
        authenticated: true,
        username: user.username,
      },
    };
  } catch (err) {
    res.writeHead(302, { Location: "/profile" });
    res.end();
  }
  return { props: {} };
}

export default Protected;
