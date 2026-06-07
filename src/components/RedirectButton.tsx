"use client";

import { useRouter } from "next/navigation";

interface IProps {
  className: string;
  whereToGo: "back" | "forward" | { path: string };
  children: string;
}

export default function RedirectButton({
  className,
  whereToGo,
  children,
}: IProps) {
  const router = useRouter();

  return (
    <button
      className={className}
      style={{
        fontSize: "25px",
        padding: "10px",
        border: "2px solid grey",
        borderRadius: "10px",
        cursor: "pointer",
        backgroundColor: "transparent",
      }}
      onClick={() => {
        if (whereToGo === "back") {
          // router.back();
          window.history.back();
          return;
        } else if (whereToGo === "forward") {
          // router.forward();
          window.history.forward();
          return;
        }

        router.push(whereToGo.path);
        router.refresh();
      }}
    >
      {children}
    </button>
  );
}
