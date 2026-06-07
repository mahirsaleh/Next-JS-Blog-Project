"use client";

import Link from "next/link";

import { useConvexAuth, useQuery } from "convex/react";

import { authClient } from "@/src/libs/auth-client";
import { useRouter } from "next/navigation";

import CommonNavBar from "@/src/components/NavComponents/CommonNavBar";
import NavLogo from "@/src/components/NavComponents/NavLogo";
import ThemeButton from "@/src/components/NavComponents/ThemeButton";
import NavSkeleton from "./NavSkeleton";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import { useToastContext } from "@/src/contextProviders/MyContexts";

export default function PagesNav() {
  const { isLoading } = useConvexAuth();

  const { setToastData } = useToastContext();

  const [isCustomLoading, setIsCustomLoading] = useState<boolean>(false);

  const convexUser = useQuery(api.auth.getMe);

  const router = useRouter();

  const handleLogout = async () => {
    setIsCustomLoading(true);
    try {
      await authClient.signOut();

      router.refresh();
      router.push("/");
    } catch (error) {
      const PagesNavError =
        error instanceof Error ? error : new Error("something went wrong!");

      setToastData(PagesNavError.message);

      setIsCustomLoading(false);
    }
  };

  useEffect(() => {
    if (!convexUser && !isLoading) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsCustomLoading(false);
    }
  }, [convexUser, isLoading]);

  // return (
  //   <>
  //     {convexUser ? (
  //       <CommonNavBar className="pages-layout-header__nav-bar">
  //         <NavLogo />
  //         <nav className="nav-bar__pages-nav">
  //           <Link href="/">Home</Link>
  //           <Link href="/Blog">Blog</Link>
  //           <Link href="/Create">Create</Link>
  //         </nav>
  //         <nav className="nav-bar__sign-log-theme-nav">
  //           <p className="user-info">{convexUser?.name}</p>
  //           <button className="logout-button" onClick={handleLogout}>
  //             Log Out
  //           </button>
  //           <ThemeButton />
  //         </nav>
  //       </CommonNavBar>
  //     ) : (
  //       <CommonNavBar className="pages-layout-header__nav-bar">
  //         <NavLogo />
  //         <nav className="nav-bar__pages-nav">
  //           <Link href="/">Home</Link>
  //           <Link href="/Blog">Blog</Link>
  //           <Link href="/Create">Create</Link>
  //         </nav>

  //         <nav className="nav-bar__sign-log-theme-nav">
  //           <Link href="/SignUp">Sign Up</Link>
  //           <Link href="/LogIn">Log In</Link>
  //           <ThemeButton />
  //         </nav>
  //       </CommonNavBar>
  //     )}
  //   </>
  // );

  return (
    <>
      {isLoading || isCustomLoading ? (
        <NavSkeleton />
      ) : (
        <CommonNavBar className="pages-layout-header__nav-bar">
          <NavLogo />
          <nav className="nav-bar__pages-nav">
            <Link href="/">Home</Link>
            <Link href="/Blog">Blog</Link>
            <Link href="/Create">Create</Link>
          </nav>

          <nav className="nav-bar__sign-log-theme-nav">
            {convexUser ? (
              <>
                <p className="user-info">{convexUser?.name}</p>
                <button className="logout-button" onClick={handleLogout}>
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link href="/SignUp">Sign Up</Link>
                <Link href="/LogIn">Log In</Link>
              </>
            )}
            <ThemeButton />
          </nav>
        </CommonNavBar>
      )}
    </>
  );
}
