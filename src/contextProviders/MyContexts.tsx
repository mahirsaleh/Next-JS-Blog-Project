"use client";

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
