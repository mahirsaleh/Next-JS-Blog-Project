"use client";

import { useConvexAuth } from "convex/react";
import Link from "next/link";

export default function HomePage({}) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="home-page-section">
        <div className="home-page-section__text-loader"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="home-page-section">
        <p className="home-page-section__text">
          Please <Link href="/LogIn">Log In</Link> or{" "}
          <Link href="/SignUp">Sign Up</Link> to Create or See Blogs
        </p>
      </div>
    );
  }

  return (
    <div className="home-page-section">
      <h1 className="home-page-section__heading">Welcome To Our Blog</h1>
    </div>
  );
}
