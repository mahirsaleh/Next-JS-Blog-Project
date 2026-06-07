"use client";

import { TiAdjustContrast } from "react-icons/ti";

import { useTheme } from "next-themes";

import "@/src/css/themeButton.css";

export default function ThemeButton() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <button
    className="theme-button"
      onClick={() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
    >
      <TiAdjustContrast />
    </button>
  );
}
