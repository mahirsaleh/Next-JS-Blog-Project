"use client";

import { useState } from "react";
import { DeletePostContext } from "./MyContexts";

import { TDeletingType } from "./MyContexts";

export default function DeletePostWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isShowDeletePostPopUpState, setIsShowDeletePostPopUpState] =
    useState(false);
  const [deletingType, setIsDeletingType] = useState<TDeletingType>({
    type: "",
  });

  return (
    <DeletePostContext
      value={{
        isShow: isShowDeletePostPopUpState,
        setIsShow: setIsShowDeletePostPopUpState,
        deleteingType: deletingType,
        setIsDeletingType: setIsDeletingType,
      }}
    >
      {children}
    </DeletePostContext>
  );
}
