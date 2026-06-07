"use client";

import { useState } from "react";
import { ToastContext } from "./MyContexts";

export default function ToastWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toastState, setToastState] = useState("");

  return (
    <ToastContext
      value={{ toastData: toastState, setToastData: setToastState }}
    >
      {children}
    </ToastContext>
  );
}
