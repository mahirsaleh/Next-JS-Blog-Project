import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./betterAuth/auth";
import { Doc } from "./_generated/dataModel";

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
      authorName: user.name,
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

export const deletePost = mutation({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new ConvexError("Not Authenticated");
    }

    const post = await ctx.db.get(args.postId);
    if (!post) {
      throw new ConvexError("Post does not exist");
    }

    if (post.authorID !== user._id) {
      throw new ConvexError("You are not the Owner of the Post");
    }

    await ctx.storage.delete(post.imageStorageID);

    await ctx.db.delete(args.postId);

    return true;
  },
});

export const searchPost = query({
  args: {
    term: v.string(),
    limit: v.number(),
  },
  handler: async function (ctx, args) {
    const limit = args.limit;

    const results: Array<{
      id: string;
      title: string;
      body: string;
    }> = [];

    const resultsWithoutDuplication = new Set();

    const pushDocuments = async function (documents: Array<Doc<"posts">>) {
      for (const post of documents) {
        if (!resultsWithoutDuplication.has(post._id)) {
          resultsWithoutDuplication.add(post._id);

          results.push({
            id: post._id,
            title: post.title,
            body: post.body,
          });
          if (results.length >= limit) break;
        }
      }
    };

    const titleMatches = await ctx.db
      .query("posts")
      .withSearchIndex("searchTitle", (q) => q.search("title", args.term))
      .take(limit);

    await pushDocuments(titleMatches);

    if (results.length < limit) {
      const bodyMatches = await ctx.db
        .query("posts")
        .withSearchIndex("searchBody", (q) => q.search("body", args.term))
        .take(limit);

      await pushDocuments(bodyMatches);
    }

    return results;
  },
});
