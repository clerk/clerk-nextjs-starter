import styles from "/styles/Shared.module.css";
import { clerkClient, getAuth, buildClerkProps } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";
import React from "react";

const mockGetPosts = (userId) => {
  return Promise.resolve([{ title: "An Example Post", content: "Hello from Clerk + Next.js", userId }]);
};

export const getServerSideProps = async ({ req, resolvedUrl }) => {
  const { userId } = getAuth(req);
  const user = userId ? await clerkClient.users.getUser(userId) : null;

  console.log("Auth state:", getAuth(req));

  const posts = await mockGetPosts(userId);
  return { props: { ...buildClerkProps(req, { user }), posts } };
};

const SSRDemoPage = ({ posts }) => {
  const { isSignedIn, isLoaded, user } = useUser();

  // Code hightlighting
  React.useEffect(() => {
    if (window.Prism) {
      window.Prism.highlightAll();
    }
  });

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>SSR Demo page</h1>
        <p className={styles.description}>
          This page and any displayed data are fully rendered on the server side. Reload this page to try it out.
        </p>

        <div className={styles.preContainer}>
          <h2 className={styles.subtitle}>Data returned from getServerSideProps</h2>
          <p className={styles.instructions}>
            `<strong>getServerSideProps</strong>` uses `<strong>getAuth</strong>` to get the userId and fetch the posts
            from a remote database
          </p>
          <pre>
            <code className="language-js">{JSON.stringify({ posts }, null, 2)}</code>
          </pre>
        </div>

        <div className={styles.preContainer}>
          <h2 className={styles.subtitle}>useUser hook</h2>
          <p className={styles.instructions}>
            Using <strong>{`clerkClient.users.getUser`}</strong> during the SSR request allows all Clerk data available
            both during SSR and CSR
          </p>
          <pre>
            <code className="language-js">{JSON.stringify({ isLoaded })}</code>
          </pre>
          <pre>
            <code className="language-js">{JSON.stringify({ isSignedIn })}</code>
          </pre>
          <pre>
            <code className="language-js">{JSON.stringify({ user }, null, 2)}</code>
          </pre>
        </div>
      </main>
    </div>
  );
};

export default SSRDemoPage;
