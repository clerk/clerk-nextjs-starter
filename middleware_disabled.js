import { withEdgeMiddlewareAuth } from "@clerk/nextjs/edge-middleware";
import { NextResponse } from "next/server";

export const middleware_disabled = withEdgeMiddlewareAuth((request) => {
  const { sessionId, userId } = request.auth;

  if (request.nextUrl.pathname.startsWith("/protected-pages") && !sessionId) {
    const destination = request.nextUrl.href;
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    url.searchParams.set("redirect_url", destination);
    return NextResponse.redirect(url);
  }
});
