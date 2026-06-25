// "use client";

// import RedirectButton from "@/src/components/RedirectButton";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="container"
      style={{
        height: "80svh",
        width: "100%",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <h1>Page Not Found</h1>
      <h2>Go To Previous Page</h2>

     
      <Link
        className="container__back-button"
        href="/"
        style={{
          fontSize: "25px",
          padding: "10px",
          border: "2px solid grey",
          borderRadius: "10px",
          cursor: "pointer",
          backgroundColor: "transparent",
        }}
      >
        Home Page
      </Link>
    </div>
  );
}
