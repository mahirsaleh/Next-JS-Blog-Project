// convex/auth.ts
import { query } from "./_generated/server";

export const getMe = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return null;
    }

    // This returns the information encoded in the JWT token
    // that BetterAuth sends to Convex
    return {
      name: identity.name,
      email: identity.email,
      picture: identity.pictureUrl,
    };
  },
});
