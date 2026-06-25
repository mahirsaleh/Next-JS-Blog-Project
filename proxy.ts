import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/Blog", "/Create", "/Blog/:id*", "/LogIn", "/SignIn"],
};

export function proxy(request: NextRequest) {
  const sesstionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  const DataRouteArray = ["/Blog", "/Create", "/Blog/:id*"];
  const isTryToSeeData = DataRouteArray.some((singlePath) =>
    pathname.startsWith(singlePath),
  );

  if (!sesstionCookie && isTryToSeeData) {
    return NextResponse.redirect(new URL("/LogIn", request.url));
  }

  const authRouteArray = ["/SignIn", "/LogIn"];
  const isLogInUserWantToGoAuthPages = authRouteArray.includes(pathname);

  if (sesstionCookie && isLogInUserWantToGoAuthPages) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
