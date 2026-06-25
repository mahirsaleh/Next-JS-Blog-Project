"use client";
import { useState, useEffect } from "react";

export function useConnection() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOffline(!window.navigator.onLine);
  }, []);

  useEffect(() => {
    const onlineHandler = () => setIsOffline(false);
    const offlineHandler = () => setIsOffline(true);

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);

  return {
    isOffline: isOffline,
  };
}
