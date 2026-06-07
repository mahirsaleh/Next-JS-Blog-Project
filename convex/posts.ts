import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./betterAuth/auth";

export const getImageUrl = query({
  args: { imageStorageID: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.imageStorageID);
  },
});

export const createPosts = mutation({
  args: {
    title: v.string(),
    body: v.string(),
    imageStorageID: v.id("_storage"),
    imageBlurDataURL: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new ConvexError("Not Authenticated");
    }

    const blogArticle = await ctx.db.insert("posts", {
      title: args.title,
      body: args.body,
      authorID: user._id,
      imageStorageID: args.imageStorageID,
      imageBlurDataURL: args.imageBlurDataURL,
    });

    return blogArticle;
  },
});

export const getPosts = query({
  args: {},
  handler: async (ctx) => {
    const allPostsData = await ctx.db.query("posts").order("desc").collect();

    return await Promise.all(
      allPostsData.map(async (post) => {
        const resolvedImageURL =
          post.imageStorageID !== undefined
            ? await ctx.storage.getUrl(post.imageStorageID)
            : null;

        return {
          ...post,
          imageURL: resolvedImageURL,
        };
      }),
    );

    // return allPostsData;
  },
});

export const generateImageUploadURL = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new ConvexError("Not Authenticated");
    }

    return await ctx.storage.generateUploadUrl();
  },
});

export const singleBlogWithID = query({
  args: {
    postID: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const singlePost = await ctx.db.get(args.postID);

    const resolvedImageURL =
      singlePost?.imageStorageID !== undefined
        ? await ctx.storage.getUrl(singlePost.imageStorageID)
        : null;

    return {
      ...singlePost,
      imageURL: resolvedImageURL,
    };
  },
});
