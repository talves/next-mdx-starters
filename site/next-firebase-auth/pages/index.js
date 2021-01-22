import { useState, useEffect } from "react";
import Head from "next/head";
import { useFirebaseUser } from "firebase-react-provider";
import { LoginComponent } from "@components/auth";
import Header from "@components/Header";
import Footer from "@components/Footer";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <header className="App-header">
          <Header title="Hello World, it's alive!" />
          <LoginComponent>
            {user && name ? `Hello ${name}!` : "Not Logged In"}
          </LoginComponent>
        </header>
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
      </main>

      <Footer />
    </div>
  );
}
