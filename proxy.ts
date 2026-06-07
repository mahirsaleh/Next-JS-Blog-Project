import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/Blog", "/Create", "/Blog/:id*"],
};

export function proxy(request: NextRequest) {
  const sesstionCookie = getSessionCookie(request);

  if (!sesstionCookie) {
    return NextResponse.redirect(new URL("/LogIn", request.url));
  }

  return NextResponse.next();
}
