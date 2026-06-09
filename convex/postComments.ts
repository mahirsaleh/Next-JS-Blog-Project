import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./betterAuth/auth";

export const getPostComments = query({
  args: {
    postID: v.id("posts"),
  },
  async handler(ctx, args) {
    const postCommentsData = await ctx.db
      .query("postComments")
      .filter((singlePost) =>
        singlePost.eq(singlePost.field("postID"), args.postID),
      )
      .order("desc")
      .collect();

    return postCommentsData;
  },
});

export const createPostComments = mutation({
  args: {
    body: v.string(),
    postID: v.id("posts"),
  },
  async handler(ctx, args) {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new ConvexError("Not Authenticated");
    }

    return await ctx.db.insert("postComments", {
      postID: args.postID,
      body: args.body,
      authorID: user._id,
      authorName: user.name,
    });
  },
});

export const deletePostComment = mutation({
  args: {
    commentID: v.id("postComments"),
  },
  async handler(ctx, args) {
    // 1. Get the current user
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Not Authenticated");
    }

    // 2. Fetch the comment to check ownership
    const comment = await ctx.db.get(args.commentID);
    if (!comment) {
      throw new ConvexError("Comment not found");
    }

    // 3. Ensure the current user is the author
    if (comment.authorID !== user._id) {
      throw new ConvexError("You are not authorized to delete this comment");
    }

    // 4. Delete the document
    await ctx.db.delete(args.commentID);
  },
});
