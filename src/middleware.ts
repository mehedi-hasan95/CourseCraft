import authConfig from "@/auth.config";
import NextAuth from "next-auth";
const { auth } = NextAuth(authConfig);

import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
  teacherRoute,
  adminRoute,
} from "@/routes";
import { CurrentUserRole } from "./lib/current-user";
import { NextResponse } from "next/server";

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLogIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isTeacherRoute = nextUrl.pathname.startsWith(teacherRoute);
  const isAdminRoute = nextUrl.pathname.startsWith(adminRoute);

  //   User allow to login or register API access
  if (isApiAuthRoute) {
    return null;
  }

  //   User allow to login or register page. If login redirect to default page
  if (isAuthRoute) {
    if (isLogIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  //   Logout user can't visit the spesific page
  if (!isLogIn && !isPublicRoute) {
    // User trying to visite procected route redirect to login after logit redirect the previous page
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    // The route
    return NextResponse.redirect(
      new URL(`/signin?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  const getRole = await CurrentUserRole();
  //Allow only Teacher
  if (isTeacherRoute) {
    if (getRole === "USER") {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
    return null;
  }
  //Allow only Admin
  if (isAdminRoute) {
    if (getRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
    return null;
  }
  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
