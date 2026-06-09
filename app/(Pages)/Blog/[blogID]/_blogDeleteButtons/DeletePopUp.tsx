"use client";

import { useTransition } from "react";

import {
  useDeletePostContext,
  useToastContext,
} from "@/src/contextProviders/MyContexts";

import "@/src/css/PageDeletePopUp/deletePopUp.css";
import { deleteBlogCommentFunction, deleteBlogFunction } from "@/app/actions";
import { useRouter } from "next/navigation";

export default function DeletePopUp() {
  const { isShow, setIsShow, deleteingType, setIsDeletingType } =
    useDeletePostContext();

  const { setToastData } = useToastContext();

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const clearButtonHandler = () => {
    setIsShow(false);
    setIsDeletingType({ type: "" });
  };

  const deleteHandler = async function () {
    startTransition(async function () {
      try {
        if (deleteingType.type === "Post") {
          await deleteBlogFunction({ postId: deleteingType.postID });

          clearButtonHandler();
          setToastData("Post has been deleted");
          router.refresh();
          router.push("/Blog");

          return;
        } else if (deleteingType.type === "Comment") {
          await deleteBlogCommentFunction({
            commentID: deleteingType.commentID,
            blogID: deleteingType.postID,
          });

          clearButtonHandler();
          setToastData("Comment has been deleted");
          // router.refresh();
          return;
        }
      } catch (error) {
        throw error;
      }
    });
  };

  return (
    <div
      className={`main-container ${isShow ? "main-container--show" : "main-container--hide"}`}
    >
      <div className={`delete-pop-up-container`}>
        <button
          type="button"
          className="delete-pop-up-container__clear-button"
          onClick={clearButtonHandler}
        >
          x
        </button>

        <p className="delete-pop-up-container__text">
          Do You Want to Delete This {deleteingType.type} ?
        </p>

        <button
          className="delete-pop-up-container__delete-button"
          type="button"
          onClick={deleteHandler}
        >
          {isPending ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
