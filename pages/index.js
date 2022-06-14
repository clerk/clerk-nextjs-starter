import styles from "/styles/Home.module.css";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { withServerSideAuth } from "@clerk/nextjs/ssr";
import React from "react";
import Link from "next/link";

export const getServerSideProps = withServerSideAuth();

const ClerkFeatures = () => (
  <Link href="/user">
    <a className={styles.cardContent}>
      <img alt="Explore Clerk components" src="/icons/layout.svg" />
      <div>
        <h3>Explore features provided by Clerk</h3>
        <p>Interact with the user button, user profile, and more to preview what your users will see</p>
      </div>
      <div className={styles.arrow}>
        <img src="/icons/arrow-right.svg" />
      </div>
    </a>
  </Link>
);

const SSRDemoLink = () => (
  <Link href="/ssr-demo">
    <a className={styles.cardContent}>
      <img alt="SSR demo" src="/icons/sparkles.svg" />
      <div>
        <h3>Visit the SSR demo page</h3>
        <p>
          See how Clerk hydrates the auth state during SSR and CSR, enabling server-side generation even for
          authenticated pages
        </p>
      </div>
      <div className={styles.arrow}>
        <img src="/icons/arrow-right.svg" />
      </div>
    </a>
  </Link>
);

const MiddlewareProtectedPageLink = () => (
  <Link href="/protected-pages">
    <a className={styles.cardContent}>
      <img alt="Protected pagefvisi" src="/icons/shield-check.svg" />
      <div>
        <h3>Visit page protected by _middleware</h3>
        <p>Find out how you can use Next.js middleware and Clerk stateless auth to protect entire routes at the edge</p>
      </div>
      <div className={styles.arrow}>
        <img src="/icons/arrow-right.svg" />
      </div>
    </a>
  </Link>
);

const SignupLink = () => (
  <Link href="/sign-up">
    <a className={styles.cardContent}>
      <img alt="Sign up" src="/icons/user-plus.svg" />
      <div>
        <h3>Sign up for an account</h3>
        <p>Sign up and sign in to explore all the features provided by Clerk out-of-the-box</p>
      </div>
      <div className={styles.arrow}>
        <img src="/icons/arrow-right.svg" />
      </div>
    </a>
  </Link>
);

const apiSample = `
import { withAuth } from "@clerk/nextjs/api";

export default withAuth((req, res) => {
  const { sessionId } = req.auth;

  if (!sessionId) {
    return res.status(401).json({ id: null });
  }

  return res.status(200).json({ id: sessionId });
});
`.trim();

// Main component using <SignedIn> and <SignedOut>.
//
// The SignedIn and SignedOut components are used to control rendering
// depending on whether or not a visitor is signed in.
//
// https://clerk.dev/docs/component-reference/signed-in
const Main = () => (
  <main className={styles.main}>
    <h1 className={styles.title}>Welcome to your new app</h1>
    <SignedIn>
      <p className={styles.description}>You have successfully signed in</p>
    </SignedIn>
    <SignedOut>
      <p className={styles.description}>Sign up for an account to get started</p>
    </SignedOut>

    <div className={styles.cards}>
      <SignedIn>
        <div className={styles.card}>
          <SSRDemoLink />
        </div>
        <div className={styles.card}>
          <MiddlewareProtectedPageLink />
        </div>
        <div className={styles.card}>
          <ClerkFeatures />
        </div>
      </SignedIn>
      <SignedOut>
        <div className={styles.card}>
          <SignupLink />
        </div>
      </SignedOut>

      <div className={styles.card}>
        <Link href="https://dashboard.clerk.dev/last-active?utm_source=github&utm_medium=starter_repos&utm_campaign=nextjs_starter">
          <a target="_blank" rel="noopener" className={styles.cardContent}>
            <img src="/icons/settings.svg" />
            <div>
              <h3>Configure settings for your app</h3>
              <p>Visit Clerk to manage instances and configure settings for user management, theme, and more</p>
            </div>
            <div className={styles.arrow}>
              <img src="/icons/arrow-right.svg" />
            </div>
          </a>
        </Link>
      </div>
    </div>

    <SignedIn>
      <APIRequest />
    </SignedIn>

    <div className={styles.links}>
      <Link href="https://clerk.dev/docs?utm_source=github&utm_medium=starter_repos&utm_campaign=nextjs_starter">
        <a target="_blank" rel="noopener" className={styles.link}>
          <span className={styles.linkText}>Read Clerk documentation</span>
        </a>
      </Link>
      <Link href="https://nextjs.org/docs">
        <a target="_blank" rel="noopener" className={styles.link}>
          <span className={styles.linkText}>Read NextJS documentation</span>
        </a>
      </Link>
    </div>
  </main>
);

const APIRequest = () => {
  React.useEffect(() => {
    if (window.Prism) {
      window.Prism.highlightAll();
    }
  });
  const [response, setResponse] = React.useState("// Click above to run the request");
  const makeRequest = async () => {
    setResponse("// Loading...");

    try {
      const res = await fetch("/api/getAuthenticatedUserId");
      const body = await res.json();
      setResponse(JSON.stringify(body, null, "  "));
    } catch (e) {
      setResponse("// There was an error with the request. Please contact support@clerk.dev");
    }
  };
  return (
    <div className={styles.backend}>
      <h2>API request example</h2>
      <div className={styles.card}>
        <button target="_blank" rel="noopener" className={styles.cardContent} onClick={() => makeRequest()}>
          <img src="/icons/server.svg" />
          <div>
            <h3>fetch('/api/getAuthenticatedUserId')</h3>
            <p>Retrieve the user ID of the signed in user, or null if there is no user</p>
          </div>
          <div className={styles.arrow}>
            <img src="/icons/download.svg" />
          </div>
        </button>
      </div>
      <h4>
        Response
        <em>
          <SignedIn>You are signed in, so the request will return your user ID</SignedIn>
          <SignedOut>You are signed out, so the request will return null</SignedOut>
        </em>
      </h4>
      <pre>
        <code className="language-js">{response}</code>
      </pre>
      <h4>pages/api/getAuthenticatedUserId.js</h4>
      <pre>
        <code className="language-js">{apiSample}</code>
      </pre>
    </div>
  );
};

// Footer component
const Footer = () => (
  <footer className={styles.footer}>
    Powered by{" "}
    <a
      href="https://clerk.dev?utm_source=github&utm_medium=starter_repos&utm_campaign=nextjs_starter"
      target="_blank"
      rel="noopener"
    >
      <img src="/clerk.svg" alt="Clerk" className={styles.logo} />
    </a>
    +
    <a href="https://nextjs.org/" target="_blank" rel="noopener">
      <img src="/nextjs.svg" alt="Next.js" className={styles.logo} />
    </a>
  </footer>
);

const Home = () => (
  <div className={styles.container}>
    <Main />
    <Footer />
  </div>
);

export default Home;
