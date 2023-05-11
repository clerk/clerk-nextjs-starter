import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Set the paths that don't require the user to be signed in
  // Sign in and sign up pages are already made public by Clerk
  publicRoutes: ["/"],
});

export const config = { matcher: "/((?!_next/image|_next/static|favicon.ico|.*.svg).*)" };
