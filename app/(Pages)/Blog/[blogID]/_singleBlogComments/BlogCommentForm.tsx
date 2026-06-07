"use client";

import { submitBlogCommentFunction } from "@/app/actions";
import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";
import { useActionState, useReducer, useState } from "react";

type TInitialBlogCommentFormState = {
  body: string;
};

const initialBlogCommentFormState: TInitialBlogCommentFormState = {
  body: "",
};

type TBlogCommentFormReducerProperty =
  | {
      type: "update";
      key: string;
      value: string;
    }
  | {
      type: "reset";
    };

const blogCommentFormReducer = function (
  prevState: TInitialBlogCommentFormState,
  action: TBlogCommentFormReducerProperty,
): TInitialBlogCommentFormState {
  if (action.type === "reset") {
    return initialBlogCommentFormState;
  }

  return {
    ...prevState,
    [action.key]: action.value,
  };
};

type TInitialBlogCommentFormActionState = {
  defaultErrorMessage?: string;
  bodyErrorMessage: string | boolean;
};

const initialBlogCommentFormActionState: TInitialBlogCommentFormActionState = {
  defaultErrorMessage: "",
  bodyErrorMessage: false,
};

type IUseParams = {
  blogID: Id<"posts">;
};

export default function BlogCommentForm() {
  const { blogID } = useParams<IUseParams>();

  const [isShowErrorMessage, setIsShowErrorMessage] = useState(false);

  const [blogCommentFormState, blogCommentFormDispatch] = useReducer(
    blogCommentFormReducer,
    initialBlogCommentFormState,
  );

  const [
    blogCommentFormActionState,
    blogCommentFormActionDispatch,
    blogCommentFormActionIsPending,
  ] = useActionState(
    async (
      prevState: TInitialBlogCommentFormActionState,
      formData: FormData,
    ): Promise<TInitialBlogCommentFormActionState> => {
      setIsShowErrorMessage(() => false);

      const body = formData.get("blogCommentForm__textArea") as string;
      const bodyError = body.length > 500;

      if (bodyError) {
        setIsShowErrorMessage(true);
        return {
          bodyErrorMessage:
            bodyError && "Comment can not be more than 500 words",
        };
      }

      try {
        await submitBlogCommentFunction({ commentBody: body, blogID: blogID });

        blogCommentFormDispatch({ type: "reset" });
        return initialBlogCommentFormActionState;
      } catch (error: unknown) {
        setIsShowErrorMessage(true);
        return {
          bodyErrorMessage: false,
          defaultErrorMessage:
            (error as Error).message || "Something Went Wrong",
        };
      }
    },
    initialBlogCommentFormActionState,
  );

  return (
    <form action={blogCommentFormActionDispatch} className="blog-comment-form">
      <textarea
        className="blog-comment-form__text-area"
        style={
          blogCommentFormActionIsPending
            ? {
                opacity: 0.7,
              }
            : {}
        }
        required
        disabled={blogCommentFormActionIsPending}
        name="blogCommentForm__textArea"
        id="blogCommentForm__textArea"
        placeholder="Write Your Comment"
        rows={10}
        value={blogCommentFormState.body}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
          blogCommentFormDispatch({
            type: "update",
            key: "body",
            value: event.target.value,
          });
        }}
      ></textarea>

      <div className="blog-comment-form__button-div">
        <button
          style={
            blogCommentFormActionIsPending
              ? {
                  opacity: 0.7,
                }
              : {}
          }
          disabled={blogCommentFormActionIsPending}
          className="blog-comment-form__buttons blog-comment-form__submit-button"
          type="submit"
        >
          Submit
        </button>
        <button
          style={
            blogCommentFormActionIsPending
              ? {
                  opacity: 0.7,
                }
              : {}
          }
          disabled={blogCommentFormActionIsPending}
          className="blog-comment-form__buttons blog-comment-form__clear-button"
          type="submit"
          onClick={() => {
            setIsShowErrorMessage(false);
            blogCommentFormDispatch({ type: "reset" });
          }}
        >
          Clear
        </button>
      </div>

      {isShowErrorMessage && (
        <div className="blog-form__error-div">
          {blogCommentFormActionState.bodyErrorMessage && (
            <p className="error-div__error-message">
              {blogCommentFormActionState.bodyErrorMessage}
            </p>
          )}
          {blogCommentFormActionState.defaultErrorMessage && (
            <p className="error-div__error-message">
              {blogCommentFormActionState.defaultErrorMessage}
            </p>
          )}

          <button
            type="button"
            className="error-div__error-clear-button"
            onClick={() => {
              setIsShowErrorMessage(false);
            }}
          >
            X
          </button>
        </div>
      )}
    </form>
  );
}
