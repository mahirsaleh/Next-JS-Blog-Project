"use client";

import BlogCommentForm from "./BlogCommentForm";
import { Preloaded, usePreloadedQuery } from "convex/react";

import { FaRegCircleUser } from "react-icons/fa6";

import "@/src/css/blogComments.css";
import { api } from "@/convex/_generated/api";

type TProps = {
  preloadedComments: Preloaded<typeof api.postComments.getPostComments>;
};

export default function BlogComments({ preloadedComments }: TProps) {
  const commentList = usePreloadedQuery(preloadedComments);

  return (
    <div className="blog-comments-section">
      <p className="blog-comments-section__comment-number">
        {commentList.length ? commentList.length : "No"} comments
      </p>
      <hr className="blog-comments-sectin__hr" />

      <BlogCommentForm />
      {commentList.length ? (
        <div className="blog-comments-section__comments-div">
          {commentList.map((comment) => {
            return (
              <div key={comment._id} className="comments-div__comment">
                <div className="comment__name-time-div">
                  <p className="name-time-div__name">
                    <FaRegCircleUser className="name__user-icon" />
                    {comment.authorName}
                  </p>
                  <p className="name-time-div__time">
                    {new Date(comment._creationTime).toLocaleDateString(
                      "en-BD",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      },
                    )}
                  </p>
                </div>
                <p className="comment__body">{comment.body}</p>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
