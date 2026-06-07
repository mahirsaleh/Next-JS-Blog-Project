"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

import RedirectButton from "@/src/components/RedirectButton";

export default function MyError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry?: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div
      className="container"
      style={{
        height: "100svh",
        width: "100%",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <h1>Something went wrong!</h1>
      {error.message && <h2>{error.message}</h2>}
      <button
        className="container__retry-button"
        onClick={
          // Attempt to recover by re-fetching and re-rendering the segment
          () => {
            if (retry) {
              retry();
            }
            window.location.reload();
          }
        }
        style={{
          fontSize: "25px",
          padding: "10px",
          border: "2px solid grey",
          borderRadius: "10px",
          cursor: "pointer",
          backgroundColor: "transparent",
        }}
      >
        Try again
      </button>

      <RedirectButton
        className="container__home-button"
        whereToGo={{ path: "/" }}
      >
        Go To Home
      </RedirectButton>
    </div>
  );
}
