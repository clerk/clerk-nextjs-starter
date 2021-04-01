import "../styles/globals.css";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/clerk-react";

const clerkClientHost = process.env.NEXT_PUBLIC_CLERK_HOST;

/**
 * List pages you want to be publicly accessible, or leave empty if
 * every page requires authentication. Use this naming strategy:
 *  "/"              for pages/index.js
 *  "/foo"           for pages/foo/index.js
 *  "/foo/bar"       for pages/foo/bar.js
 *  "/foo/[...bar]"  for pages/foo/[...bar].js
 */
const publicPages = ["/", "/sign-in/[[...index]]", "/sign-up/[[...index]]"];

// Header component using <SignedIn> & <SignedOut>.
//
// The SignedIn and SignedOut components are used to control rendering depending
// on whether or not a visitor is signed in.
//
// https://docs.clerk.dev/frontend/react/signedin-and-signedout
const Header = () => (
  <header className={styles.header}>
    <div className={styles.left}>
      <Link href="/">
        <a className={styles.logo}>
          <Image src="/logo.svg" width="108" height="32" alt="Logo" />
        </a>
      </Link>
    </div>
    <div className={styles.right}>
      <SignedOut>
        <Link href="/sign-in">Sign in</Link>
      </SignedOut>
      <SignedIn>
        <UserButton userProfileURL="/user" afterSignOutAll="/" />
      </SignedIn>
    </div>
  </header>
);

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  /**
   * If the current route is listed as public, render it directly.
   * Otherwise, use Clerk to require authentication.
   */
  return (
    <ClerkProvider
      frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}
      scriptUrl={process.env.NEXT_PUBLIC_CLERK_JS}
      navigate={(to) => router.push(to)}
    >
      {publicPages.includes(router.pathname) ? (
        <>
          <Header />
          <Component {...pageProps} />
        </>
      ) : (
        <>
          <SignedIn>
            <Header />
            <Component {...pageProps} />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      )}
    </ClerkProvider>
  );
}

function RedirectToSignIn() {
  const router = useRouter();
  useEffect(() => {
    router.push("/sign-in");
  });
  return null;
}

export default MyApp;
