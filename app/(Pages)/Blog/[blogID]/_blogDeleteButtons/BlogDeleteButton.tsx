"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useDeletePostContext } from "@/src/contextProviders/MyContexts";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";

type TBlogDeleteButtonProps = {
  authorID: string;
  imageStorageID: Id<"_storage">;
};

export default function BlogDeleteButton({
  authorID,
  imageStorageID,
}: TBlogDeleteButtonProps) {
  const user = useQuery(api.user.getCurrentUser);

  const { blogID } = useParams<{ blogID: Id<"posts"> }>();

  const { setIsShow, setIsDeletingType } = useDeletePostContext();

  return (
    <div
      className={`delete-post-button-div ${authorID === user?._id ? "delete-post-button-div--show" : "delete-post-button-div--hide"}`}
    >
      <button
        type="button"
        className="delete-post-button-div__delete-button"
        onClick={() => {
          setIsDeletingType({
            type: "Post",
            imageStorageID: imageStorageID,
            postID: blogID,
          });
          setIsShow(true);
        }}
      >
        Delete Post
      </button>
    </div>
  );
}
