"use client";

import { Id } from "@/convex/_generated/dataModel";
import { useDeletePostContext } from "@/src/contextProviders/MyContexts";

type TCommentDeleteButtonProps = {
  isShowDeleteButton: boolean;
  commentID: Id<"postComments">;
  postID: Id<"posts">;
};

export default function CommentDeleteButton({
  isShowDeleteButton,
  commentID,
  postID,
}: TCommentDeleteButtonProps) {
  const { setIsShow, setIsDeletingType } = useDeletePostContext();

  return (
    <div
      className={`delete-comment-button-div ${isShowDeleteButton ? "delete-comment-button-div--show" : "delete-comment-button-div--hide"}`}
    >
      <button
        type="button"
        className="delete-comment-button-div__delete-button"
        onClick={() => {
          setIsDeletingType({
            type: "Comment",
            commentID: commentID,
            postID: postID,
          });

          setIsShow(true);
        }}
      >
        Delete Comment
      </button>
    </div>
  );
}
