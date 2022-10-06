import { withClerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default withClerkMiddleware((req) => {
  const publicPaths = ["/", "/sign-in", "/sign-up"];
  if (publicPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }
  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
});

export const config = { matcher: "/((?!_next|static|.*\\..*|favicon.ico).*)" };
