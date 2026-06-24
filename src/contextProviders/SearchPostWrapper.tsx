"use client";

import React, { useState } from "react";
import { SearchPostContext } from "./MyContexts";

export default function SearchPostWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSow, setIsShow] = useState<boolean>(false);

  return (
    <SearchPostContext
      value={{ isShowSearchBar: isSow, setIsShowSearchBar: setIsShow }}
    >
      {children}
    </SearchPostContext>
  );
}
