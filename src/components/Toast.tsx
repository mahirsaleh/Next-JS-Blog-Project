"use client";

import { useEffect, useState } from "react";
import { useToastContext } from "../contextProviders/MyContexts";

import "@/src/css/toast.css";

export default function Toast() {
  const { toastData, setToastData } = useToastContext();
  const [isShowToast, setIsShowToast] = useState<boolean>(false);

  // for changing isShowToast data
  useEffect(() => {
    if (toastData) {
      setIsShowToast(true);
    }
  }, [toastData]);

  // for toast clear ;
  useEffect(() => {
    let toastDataTimer: number;

    if (toastData) {
      toastDataTimer = window.setTimeout(() => {
        setToastData("");
      }, 6000);
    }

    return () => {
      clearTimeout(toastDataTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastData]);

  // for isShowToast clear ;
  useEffect(() => {
    let isShowToastTimer: number;

    if (isShowToast) {
      isShowToastTimer = window.setTimeout(() => {
        setIsShowToast(false);
      }, 5000);
    }

    return () => {
      clearTimeout(isShowToastTimer);
    };
  }, [isShowToast]);

  return (
    <div
      className={`outer-toast-box ${toastData && isShowToast ? "outer-toast-box-show" : "outer-toast-box-hide"}`}
    >
      <div className="toast-container">
        <p className="toast-container__message">{toastData}</p>

        <button
          type="button"
          className="toast-container__close-button"
          onClick={() => {
            setIsShowToast(false);
          }}
        >
          X
        </button>
      </div>
    </div>
  );
}
