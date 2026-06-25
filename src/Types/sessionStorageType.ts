import { TBlogFormInitialState } from "../components/CreatePageForm";

import { TDownloadToastType } from "../components/DownloadToast";

type SessionStorageEntry =
  | {
      key: "CreatePageForm";
      value: TBlogFormInitialState;
    }
  | {
      key: "DownloadToast";
      value: TDownloadToastType;
    };

type SessionStorageKey = SessionStorageEntry["key"];

// type SessionStorageValue = SessionStorageEntry["value"];

type TGetSessionStorageFunction = <T extends SessionStorageKey>(
  sessionStorageKey: T,
) => Extract<SessionStorageEntry, { key: T }>["value"] | null;

type TSetSessionStorageFunction = <T extends SessionStorageKey>(
  sessionStorageKey: T,
  sessionStorageValue: Extract<SessionStorageEntry, { key: T }>["value"],
) => void;

export const getSessionStorage: TGetSessionStorageFunction = function (
  sessionStorageKey,
) {
  try {
    const sessionStorageData = window.sessionStorage.getItem(sessionStorageKey);
    return sessionStorageData ? JSON.parse(sessionStorageData) : null;
  } catch (error) {
    const getSessionStorageError =
      error instanceof Error
        ? error
        : new Error("Do not change any session storage key !");
    console.error(getSessionStorageError.message);
  }
};

export const setSessionStorage: TSetSessionStorageFunction = function (
  sessionStorageKey,
  sessionStorageValue,
) {
  window.sessionStorage.setItem(
    sessionStorageKey,
    JSON.stringify(sessionStorageValue),
  );
};

export const removeSessionStorage = function (
  sessionStorageKey: SessionStorageKey,
) {
  window.sessionStorage.removeItem(sessionStorageKey);
};

export const removeAllSessionStorage = function () {
  window.sessionStorage.clear();
};
