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

/* 
export const deletePostComment = mutation({
  args: {
    commentId: v.id("postComments"),
  },
  async handler(ctx, args) {
    // 1. Authenticate the user
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Not Authenticated");
    }

    // 2. Fetch the existing comment to verify ownership
    const comment = await ctx.db.get(args.commentId);
    if (!comment) {
      throw new ConvexError("Comment not found");
    }

    // 3. Authorization check: Did this user write the comment?
    if (comment.authorID !== user._id) {
      throw new ConvexError("You are not authorized to delete this comment");
    }

    // 4. Delete the comment
    await ctx.db.delete(args.commentId);

    return { success: true };
  },
});

*/
