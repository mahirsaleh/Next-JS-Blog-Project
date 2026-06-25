import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/Blog", "/Create", "/LogIn", "/SignIn", "/Blog/:id*"],
};

export function proxy(request: NextRequest) {
  const sesstionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  if (!sesstionCookie) {
    const isTryToSeeData = ["/Blog", "/Create", "/LogIn", "/Blog/:id*"].some(
      (singlePath) => pathname.startsWith(singlePath),
    );

    if (isTryToSeeData) {
      return NextResponse.redirect(new URL("/LogIn", request.url));
    }
  }

  const isLogInUserWantToGoAuthPages = ["/SignIn", "/LogIn"].includes(pathname);

  if (sesstionCookie && isLogInUserWantToGoAuthPages) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
