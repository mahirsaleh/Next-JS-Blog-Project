"use client";

import { useState, useEffect, useRef } from "react";

// import { useTheme } from "next-themes";

// import NavSkeleton from "./NavSkeleton";

import "@/src/css/commonNavBar.css";

interface IProps {
  children: React.ReactNode;
  className: string;
  isShow?: boolean;
}

export default function CommonNavBar({ children, className, isShow }: IProps) {
  // const { resolvedTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  // const [isMount, setIsMount] = useState(false);

  // useEffect(() => {
  //   setIsMount(true); // eslint-disable-line
  //   console.log("gorib");

  //   // return () => setIsMount(false);
  // }, []);

  useEffect(() => {
    const scrollFunction = () => {
      const currentScrollY = window.scrollY;
      const lastScrollYDownBeforeHide = 70;
      const lastScrollYUpBeforeShow = 10;

      if (isShow) {
        setIsVisible(true);
      } else if (currentScrollY <= lastScrollYDownBeforeHide) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      } else if (
        lastScrollY.current - currentScrollY >
        lastScrollYUpBeforeShow
      ) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", scrollFunction, { passive: true });

    return () => window.removeEventListener("scroll", scrollFunction);
  }, [isShow]);

  // if (!isMount) {
  //   console.log("mahir 1");
  //   return <NavSkeleton />;
  // }

  return (
    <nav
      suppressHydrationWarning
      className={`parent-nav ${className}`}
      style={
        isVisible
          ? {
              transform: "translateY(0)",
            }
          : {
              transform: "translateY(-100%)",
            }
      }
    >
      {children}
    </nav>
  );
}
