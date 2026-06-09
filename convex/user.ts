// convex/users.ts (or inside posts.ts)
import { query } from "./_generated/server";
import { authComponent } from "./betterAuth/auth";

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    // Better Auth helper provided by the Convex integration
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) return null;

    // Returns the entire user record, including user._id (Convex ID)
    return user;
  },
});
