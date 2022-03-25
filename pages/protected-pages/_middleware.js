import { withEdgeMiddlewareAuth } from "@clerk/nextjs/edge-middleware";
import { NextResponse } from "next/server";

export default withEdgeMiddlewareAuth((request) => {
  const { sessionId, userId } = request.auth;

  if (!sessionId) {
    const destination = request.nextUrl.href;
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    url.searchParams.set("redirect_url", destination);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});
