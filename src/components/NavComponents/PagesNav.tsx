"use client";

import Link from "next/link";

import { IoMdMenu } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";

import { useConvexAuth, useQuery } from "convex/react";

import { authClient } from "@/src/libs/auth-client";
import { useRouter } from "next/navigation";

import CommonNavBar from "@/src/components/NavComponents/CommonNavBar";
import NavLogo from "@/src/components/NavComponents/NavLogo";
import ThemeButton from "@/src/components/NavComponents/ThemeButton";
import NavSkeleton from "./NavSkeleton";

import "@/src/css/pagesNav.css";

import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";

import {
  useSearchPostContext,
  useToastContext,
} from "@/src/contextProviders/MyContexts";
import NavSearchButton from "../Search/NavSearchButton";
import { removeAllSessionStorage } from "@/src/Types/sessionStorageType";

export default function PagesNav() {
  const { isLoading } = useConvexAuth();

  const { setToastData } = useToastContext();

  const [isCustomLoading, setIsCustomLoading] = useState<boolean>(false);

  const [childNavShowHideState, setIsChildNavShowHide] = useState(false);

  const convexUser = useQuery(api.auth.getMe);

  const router = useRouter();

  const { setIsShowSearchBar } = useSearchPostContext();

  const handleLogout = async () => {
    setIsCustomLoading(true);
    try {
      await authClient.signOut();

      removeAllSessionStorage();
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
        <CommonNavBar
          isShow={childNavShowHideState}
          className="pages-layout-header__nav-bar"
        >
          <NavLogo />
          <div className="nav-bar__nav-theme-section">
            <div
              className={`nav-theme-section__nav-section ${childNavShowHideState ? "show" : "hide"}`}
            >
              <nav className="nav-bar__pages-nav">
                <Link
                  onClick={() => {
                    setIsChildNavShowHide(false);
                  }}
                  href="/"
                >
                  Home
                </Link>
                <Link
                  onClick={() => {
                    setIsChildNavShowHide(false);
                  }}
                  href="/Blog"
                >
                  Blog
                </Link>
                <Link
                  onClick={() => {
                    setIsChildNavShowHide(false);
                  }}
                  href="/Create"
                >
                  Create
                </Link>

                <NavSearchButton
                  setIsChildNavShowHide={setIsChildNavShowHide}
                />
              </nav>

              <nav className="nav-bar__sign-log-theme-nav">
                {convexUser ? (
                  <>
                    <p className="user-info">
                      <FaRegCircleUser />
                      {convexUser?.name}
                    </p>
                    <button className="logout-button" onClick={handleLogout}>
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      onClick={() => {
                        setIsChildNavShowHide(false);
                      }}
                      href="/SignUp"
                    >
                      Sign Up
                    </Link>
                    <Link
                      onClick={() => {
                        setIsChildNavShowHide(false);
                      }}
                      href="/LogIn"
                    >
                      Log In
                    </Link>
                  </>
                )}
              </nav>
            </div>

            <div className="nav-theme-section__theme-section">
              <ThemeButton />

              <button
                onClick={() => {
                  setIsChildNavShowHide((prevState) => !prevState);
                  setIsShowSearchBar(false);
                }}
                className="theme-section__menu-button"
              >
                <IoMdMenu />
              </button>
            </div>
          </div>
        </CommonNavBar>
      )}
    </>
  );
}
