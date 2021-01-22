## Created using

`npx create-next-app next-amplify-auth`

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Make sure you have amplify configured for your setup and have created a unique user with correct permissions for this project to use amplify on aws. This is recommended, so the user has limited access to other areas of aws. Never use your IAM admin user for access to services on AWS for obvious security reasons.

`amplify init` choosing defaults

Add the authentication service for amplify to your project.

`amplify add auth`

```
? Do you want to use the default authentication and security configuration? Default configuration
? How do you want users to be able to sign in? Username
? Do you want to configure advanced settings? No, I am done.
```

`amplify push --y` deploys the authentication setup

## Amplify setup ([video][amplify])

Used to work using the user for our amplify projects locally.

`npm install -g @aws-amplify/cli`
`amplify configure`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

[amplify]: https://www.youtube.com/watch?v=n4DuYTzpvdE
