"use client";

import { FiSearch } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";

import { useSearchPostContext } from "@/src/contextProviders/MyContexts";
import { useEffect, useReducer, useRef } from "react";

import "@/src/css/Search/searchBar.css";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

type TInitialFormReducerState = {
  searchInput: string;
};

const initialFormReducerState: TInitialFormReducerState = {
  searchInput: "",
};

type TFormReducerFunctionProps =
  | {
      type: "reset";
    }
  | {
      type: "update";
      key: keyof TInitialFormReducerState;
      value: string;
    };

const formReducerFunction = function (
  prevState: TInitialFormReducerState,
  action: TFormReducerFunctionProps,
): TInitialFormReducerState {
  switch (action.type) {
    case "reset":
      return initialFormReducerState;
    case "update":
      return {
        ...prevState,
        [action.key]: action.value,
      };
  }
};

export default function SearchBar() {
  const { isShowSearchBar, setIsShowSearchBar } = useSearchPostContext();

  const [reducerFormState, formDispatch] = useReducer(
    formReducerFunction,
    initialFormReducerState,
  );

  const inputRef = useRef<HTMLInputElement | null>(null);

  const searchResult = useQuery(
    api.posts.searchPost,
    reducerFormState.searchInput.length >= 3
      ? { term: reducerFormState.searchInput, limit: 5 }
      : "skip",
  );

  const clearFormAndHideSearchBarHandler = function () {
    setIsShowSearchBar(false);

    formDispatch({ type: "reset" });
  };

  useEffect(() => {
    if (isShowSearchBar) {
      inputRef.current?.focus();
    }
  }, [isShowSearchBar]);

  return (
    <div
      className={`search-bar-outer-div ${isShowSearchBar ? "search-bar-outer-div--show" : "search-bar-outer-div--hide"}`}
    >
      <div
        className={`search-bar ${isShowSearchBar ? "search-bar-show" : "search-bar-hide"}`}
      >
        <button
          type="button"
          className="search-bar__search-bar-hide-button"
          onClick={clearFormAndHideSearchBarHandler}
        >
          X
        </button>

        <form
          className="search-bar__search-form"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <label
            className="search-form__search-input-label"
            htmlFor="search-input-label__search-input"
          >
            <input
              autoComplete="off"
              ref={inputRef}
              className="search-input-label__search-input"
              type="text"
              placeholder="Search Posts..."
              name="search-input-label__search-input"
              id="search-input-label__search-input"
              value={reducerFormState.searchInput}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                formDispatch({
                  type: "update",
                  key: "searchInput",
                  value: event.target.value,
                });
              }}
            />
            <button
              className="search-input-label__clear-button"
              type="reset"
              onClick={() => {
                formDispatch({ type: "reset" });
              }}
            >
              <IoIosCloseCircleOutline />
            </button>
          </label>

          <button type="submit" className="search-form__search-button">
            <FiSearch />
          </button>
        </form>

        {isShowSearchBar && reducerFormState.searchInput.length >= 3 ? (
          <div className="search-bar-inner-div__search-result-section">
            {searchResult ? (
              searchResult?.length ? (
                searchResult.map((post) => (
                  <Link
                    key={post.id}
                    href={`/Blog/${post.id}`}
                    onClick={clearFormAndHideSearchBarHandler}
                  >
                    <div className="search-result-section__search-result">
                      <h4 className="search-result__post-title">
                        {post.title}
                      </h4>
                      <p className="search-result__post-body">{post.body}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="search-result-section__no-post-found">
                  No Post Found
                </p>
              )
            ) : (
              <h3 className="search-result-section__no-post-found">
                Searching...
              </h3>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
