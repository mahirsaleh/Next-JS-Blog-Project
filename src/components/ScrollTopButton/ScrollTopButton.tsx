"use client";

import { GoArrowUp } from "react-icons/go";

import "@/src/css/scrollTopButton.css";
import FloatingButton from "./FloatingButton";

export default function ScrollTopButton() {
  const scrollTop = function () {
    scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    if (window.scrollY < 400) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    } else {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 250);
    }
  };

  return (
    <FloatingButton
      className={`scroll-top-button`}
      id="scroll-top-button"
      name="scroll-top-button"
      onClick={scrollTop}
    >
      <GoArrowUp />
    </FloatingButton>
  );
}
