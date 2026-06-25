"use client";

import { useState, useEffect } from "react";
import { ConvexClientProvider } from "@/src/libs/ConvexClientProvider";
import { getAuthTokenAction } from "@/app/actions";
import Offline from "../components/Offline";
import { useConnection } from "../MyHooks/useConnection";
import Loading from "@/app/loading";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | undefined>(undefined);

  const { isOffline } = useConnection();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isOffline) {
      setIsLoading(false);

      return;
    }

    const fetchToken = async () => {
      try {
        const token = await getAuthTokenAction();

        setToken(token);
      } catch (err) {
        console.error("Auth failed", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchToken();
  }, [isOffline]);

  if (isLoading) return <Loading />;

  if (isOffline) return <Offline />;

  return (
    <ConvexClientProvider initialToken={token!}>
      {children}
    </ConvexClientProvider>
  );
}
