import { defineSchema, defineTable } from "convex/server";

import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    title: v.string(),
    body: v.string(),
    authorID: v.string(),
    authorName: v.string(),
    imageStorageID: v.id("_storage"),
    imageBlurDataURL: v.string(),
  }),
  postComments: defineTable({
    postID: v.id("posts"),
    authorID: v.string(),
    authorName: v.string(),
    body: v.string(),
  }),
});
