import { convexClient } from "@convex-dev/better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  plugins: [convexClient()],
  session: {
    // This prevents the automatic fetch when clicking back into the tab
    refetchOnWindowFocus: false,
  },
});
