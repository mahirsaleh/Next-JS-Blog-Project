"use client";

import { Id } from "@/convex/_generated/dataModel";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

/* Toast Wrapper Starts */

type TToastContext = {
  toastData: string;
  setToastData: Dispatch<SetStateAction<string>>;
};

export const ToastContext = createContext<TToastContext | null>(null);

export function useToastContext(): TToastContext {
  const toast = useContext(ToastContext);

  return toast!;
}

/* Toast Wrapper Ends */

/* Delete Post Wrapper Starts */

export type TDeletingType =
  | {
      type: "Post";
      postID: Id<"posts">;
      imageStorageID: Id<"_storage">;
    }
  | {
      type: "Comment";
      postID: Id<"posts">;
      commentID: Id<"postComments">;
    }
  | {
      type: "";
    };

type TDeletePostContext = {
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
  deleteingType: TDeletingType;
  setIsDeletingType: Dispatch<SetStateAction<TDeletingType>>;
};

export const DeletePostContext = createContext<TDeletePostContext | null>(null);

export function useDeletePostContext(): TDeletePostContext {
  const deletePopUpData = useContext(DeletePostContext);

  return deletePopUpData!;
}

/* Delete Post Wrapper Ends */
