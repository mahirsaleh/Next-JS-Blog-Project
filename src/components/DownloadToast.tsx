/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import "@/src/css/downloadToast.css";
import { useEffect, useState } from "react";
import {
  getSessionStorage,
  setSessionStorage,
} from "../Types/sessionStorageType";

export type TDownloadToastType = boolean;

export default function DownloadToast() {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);

  const clearButtonHandler = function () {
    setIsShow(false);
    setSessionStorage("DownloadToast", false);
  };

  // for showing or hideing DownloadToast ;
  useEffect(() => {
    setIsMounted(true);

    console.log("Mahir Saleh");
    const handler = () => {
      const sessionStorageData = getSessionStorage("DownloadToast");

      if (sessionStorageData === null) {
        setSessionStorage("DownloadToast", true);
        setIsShow(true);
        return;
      }
      setIsShow(sessionStorageData);
    };

    // handler();

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!isMounted && !isInstallable) return null;

  return (
    <div
      className={`download-toast-outer-div ${isShow ? "download-toast-outer-div-show" : "download-toast-outer-div-hide"}`}
    >
      <div className="download-toast-container">
        <button
          type="button"
          className="download-toast-container__remove-button"
          onClick={clearButtonHandler}
        >
          X
        </button>
        <p className="download-toast-container__download-text">
          Download Our Blog
        </p>
        <button
          type="button"
          className="download-toast-container__download-button"
          onClick={() => {}}
        >
          Click Here
        </button>
      </div>
    </div>
  );
}
