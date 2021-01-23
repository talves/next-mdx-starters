import Amplify, { withSSRContext } from "aws-amplify";
import config from "../../src/aws-exports.js";

// Amplify SSR configuration needs to be enabled within each API route
Amplify.configure({ ...config, ssr: true });

export default async (req, res) => {
  const { Auth } = withSSRContext({ req });
  try {
    // Access the user session on the server in the api
    const user = await Auth.currentAuthenticatedUser();
    res.json({ user: user.username });
  } catch (err) {
    res.statusCode = 200;
    res.json({ user: null });
  }
};
