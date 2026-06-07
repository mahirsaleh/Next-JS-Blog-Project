"use client";

// import { api } from "@/convex/_generated/api";
// import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  useActionState,
  useReducer,
  useRef,
  useState,
} from "react";

import { useToastContext } from "../contextProviders/MyContexts";
import { createPostSubmitFunction } from "@/app/actions";

type TBlogFormInitialState = {
  title: string;
  content: string;
  image: undefined | File;
};

const blogFormInitialState: TBlogFormInitialState = {
  title: "",
  content: "",
  image: undefined,
};

type TBlogFormReducerAction =
  | {
      key: "title" | "content" | "image";
      value: string | File;
      title: "update";
    }
  | {
      title: "reset";
    };

const blogFormReducer = function (
  prevState: TBlogFormInitialState,
  action: TBlogFormReducerAction,
): TBlogFormInitialState {
  if (action.title === "reset") {
    return blogFormInitialState;
  }

  return {
    ...prevState,
    [action.key]: action.value,
  };
};

type TInitialActionState = {
  isError: boolean;
  defaultErrorMessage?: string;
  titleErrorMessage?: string | boolean;
  bodyErrorMessage?: string | boolean;
  imgErrorMessage?: {
    imgFormatError?: string | boolean;
    imgSizeError?: string | boolean;
  };
};

const initialActionState: TInitialActionState = {
  isError: false,
  defaultErrorMessage: "",
  titleErrorMessage: false,
  bodyErrorMessage: false,
  imgErrorMessage: {
    imgFormatError: false,
    imgSizeError: false,
  },
};

export default function CreatePageForm() {
  const [isHideErrorClearButton, setIsHideErrorClearButton] = useState(false);

  // const mutation = useMutation(api.posts.createPosts);

  const router = useRouter();

  const { setToastData } = useToastContext();

  const inputImgRef = useRef<HTMLInputElement | null>(null);

  const [blogFormState, blogFormDispatch] = useReducer(
    blogFormReducer,
    blogFormInitialState,
  );

  const [formActionState, formAction, isPending] = useActionState<
    TInitialActionState,
    FormData
  >(
    async (
      prevState: TInitialActionState,
      formData: FormData,
    ): Promise<TInitialActionState> => {
      setIsHideErrorClearButton(false);

      const title = formData.get("title-div__title-input") as string;
      const body = formData.get("content-div__content-input") as string;
      const imageFile = formData.get("img-div__img-input") as File;

      const titleError = title.length < 3 || title.length > 50;
      const bodyError = body.length < 10 || body.length > 1000;
      const imgError = {
        imgFormateError: !imageFile.type.startsWith("image/"),
        imgSizeError: imageFile.size > 4194304,
      };

      if (
        titleError ||
        bodyError ||
        imgError.imgFormateError ||
        imgError.imgSizeError
      ) {
        return {
          isError: true,
          titleErrorMessage: titleError && "Title have to be 3 to 50 words",
          bodyErrorMessage: bodyError && "body have to be 10 to 1000 words",
          imgErrorMessage: {
            imgFormatError:
              imgError.imgFormateError &&
              "Please select a valid image file (png, jpg, etc.)",
            imgSizeError:
              imgError.imgSizeError && "Image size have to be maximum 4MB",
          },
          // defaultErrorMessage: ''
        };
      }

      try {
        // mutation({
        //   body: body,
        //   title: title,
        // });

        await createPostSubmitFunction({
          body: body,
          title: title,
          image: imageFile,
        });

        blogFormDispatch({
          title: "reset",
        });
        inputImgRef.current!.value = "";
        setToastData("Blog Posted Successfully");
        router.push("/Blog");

        return initialActionState;
      } catch (error: unknown) {
        if (error instanceof Error) {
          return {
            isError: true,
            defaultErrorMessage: error.message,
          };
        }
        return {
          isError: true,
          defaultErrorMessage: "something went wrong! please try again",
        };
      }
    },
    initialActionState,
  );

  return (
    <form action={formAction} className="create-container__blog-form">
      <div className="blog-form__title-div">
        <label
          className="title-div__title-label"
          htmlFor="title-div__title-input"
        >
          Title
        </label>
        <input
          autoComplete="off"
          disabled={isPending}
          required
          type="text"
          className="title-div__title-input"
          name="title-div__title-input"
          id="title-div__title-input"
          value={blogFormState.title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            blogFormDispatch({
              title: "update",
              key: "title",
              value: event.target.value,
            });
          }}
        />
      </div>
      <div className="blog-form__content-div">
        <label
          className="content-div__content-label"
          htmlFor="content-div__content-input"
        >
          Content
        </label>
        <textarea
          disabled={isPending}
          required
          rows={10}
          // cols={50}
          className="content-div__content-textarea"
          name="content-div__content-input"
          id="content-div__content-input"
          value={blogFormState.content}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            blogFormDispatch({
              title: "update",
              key: "content",
              value: event.target.value,
            });
          }}
        ></textarea>
      </div>

      <div className="blog-form__img-div">
        <label
          style={{
            pointerEvents: "none",
          }}
          htmlFor="img-div__img-input"
        >
          Upload An Image
        </label>
        <input
          ref={inputImgRef}
          disabled={isPending}
          type="file"
          required
          accept="image/*"
          className={`img-div__img-input ${isPending && "img-div__img-input-disabled"}`}
          name="img-div__img-input"
          id="img-div__img-input"
          // value={blogFormState.image}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            // console.log(event.target.value)
            blogFormDispatch({
              title: "update",
              key: "image",
              value: event.target.files![0],
            });
          }}
        />
      </div>

      <div className="blog-form__button-section">
        <button
          type="submit"
          className="blog-form__upload-button"
          disabled={isPending}
          style={
            isPending
              ? {
                  opacity: 0.7,
                }
              : {}
          }
        >
          Upload Post
        </button>
        <button
          type="reset"
          onClick={() => {
            blogFormDispatch({ title: "reset" });
            inputImgRef.current!.value = "";
          }}
          className="blog-form__upload-button blog-form__reset-button"
          disabled={isPending}
          style={
            isPending
              ? {
                  opacity: 0.7,
                }
              : {}
          }
        >
          Reset
        </button>
      </div>

      {formActionState.isError && (
        <div
          className="blog-form__error-div"
          style={
            isHideErrorClearButton
              ? {
                  display: "none",
                }
              : {}
          }
        >
          {
            <>
              {formActionState.titleErrorMessage && (
                <p className="error-div__error-message">
                  {formActionState.titleErrorMessage}
                </p>
              )}
              {formActionState.bodyErrorMessage && (
                <p className="error-div__error-message">
                  {formActionState.bodyErrorMessage}
                </p>
              )}
              {formActionState.imgErrorMessage && (
                <p className="error-div__error-message">
                  {formActionState.imgErrorMessage.imgFormatError}
                </p>
              )}
              {formActionState.imgErrorMessage && (
                <p className="error-div__error-message">
                  {formActionState.imgErrorMessage.imgSizeError}
                </p>
              )}
              {formActionState.defaultErrorMessage && (
                <p className="error-div__error-message">
                  {formActionState.defaultErrorMessage}
                </p>
              )}
            </>
          }

          <button
            type="button"
            className="error-div__error-clear-button"
            onClick={() => {
              setIsHideErrorClearButton(true);
            }}
          >
            X
          </button>
        </div>
      )}
    </form>
  );
}
