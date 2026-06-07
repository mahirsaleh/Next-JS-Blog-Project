"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useReducer, useState } from "react";

import { authClient } from "@/src/libs/auth-client";

import { useToastContext } from "@/src/contextProviders/MyContexts";

interface IInitialActionState {
  isError: boolean;
  nameErrorMessage?: string;
  emailErrorMessage?: string;
  passwordErrorMessage?: string;
  defaultErrorMessage?: string;
}

const initialActionState: IInitialActionState = {
  isError: false,
  nameErrorMessage: "",
  emailErrorMessage: "",
  passwordErrorMessage: "",
  defaultErrorMessage: "",
};

interface IFormInitialSate {
  name: string;
  email: string;
  password: string;
}
const formInitialState: IFormInitialSate = {
  name: "",
  email: "",
  password: "",
};

type TFormAction =
  | {
      type: "update" | "reset";
      key: string;
      value: string;
    }
  | {
      type: "reset";
    };

const formReducer = function (
  prevState: IFormInitialSate,
  action: TFormAction,
): IFormInitialSate {
  if (action.type === "reset") {
    return formInitialState;
  } else {
    return {
      ...prevState,
      [action.key]: action.value,
    };
  }
};

export default function SignUpForm() {
  const [isError, setErrorState] = useState<boolean>(false);

  const router = useRouter();

  const { setToastData } = useToastContext();

  const [reducerFormState, formDispatch] = useReducer(
    formReducer,
    formInitialState,
  );
  const [actionState, formAction, isPending] = useActionState<
    IInitialActionState,
    FormData
  >(
    async (
      prevState: IInitialActionState,
      formData: FormData,
    ): Promise<IInitialActionState> => {
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      const emailError = !(email.includes("@") && email.endsWith(".com"));
      const nameError = name.length < 3 || name.length > 8;
      const passwordError = password.length < 8 || password.length > 12;

      // error checking starts ;
      if (emailError || nameError || passwordError) {
        const emailErrorMessage =
          "email must be includes @ and have to be end with .com";
        const nameErrorMessage =
          "name must be at least 3 character and max 8 character";
        const passwordErrorMessage =
          "password must be at least 8 character and max 12 character";

        const errorMessages: IInitialActionState = {
          emailErrorMessage: "",
          nameErrorMessage: "",
          passwordErrorMessage: "",
          isError: true,
        };

        if (emailError) {
          errorMessages.emailErrorMessage = emailErrorMessage;
        }
        if (nameError) {
          errorMessages.nameErrorMessage = nameErrorMessage;
        }
        if (passwordError) {
          errorMessages.passwordErrorMessage = passwordErrorMessage;
        }

        setErrorState(true);
        return errorMessages;
      }
      // error checking ends ;

      try {
        const { error } = await authClient.signUp.email({
          name: name,
          email: email,
          password: password,
        });

        if (error) {
          const errorMessages: IInitialActionState = {
            isError: true,
            defaultErrorMessage: error.message,
          };

          setErrorState(true);
          return errorMessages;
        }
        setErrorState(false);
        formDispatch({ type: "reset" });
        setToastData(`Welcome ${name}`);

        router.push("/");

        return initialActionState;
      } catch (error) {
        console.error(error);
        console.log('gorb')

        setErrorState(true);
        const errorMessages: IInitialActionState = {
          isError: true,
          defaultErrorMessage: "something went wrong!",
        };
        return errorMessages;
      }
    },

    initialActionState,
  );

  return (
    <div className={`sign-up-container container`}>
      <h2 className="sign-up-container__title">Sign Up</h2>
      {/* form start's */}
      <form
        action={formAction}
        className={`sign-up-container__sign-up-form `}
        id="sign-up-container__sign-up-form"
      >
        <div className="sign-up-form__name-section">
          <label
            htmlFor="name-section__name-input"
            className="name-section__name-label"
          >
            Name
          </label>
          <input
            required
            autoComplete="off"
            disabled={isPending}
            type="text"
            name="name"
            className="name-section__name-input"
            id="name-section__name-input"
            value={reducerFormState.name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              formDispatch({
                type: "update",
                key: event.target.name,
                value: event.target.value,
              });
            }}
          />
        </div>

        <div className="sign-up-form__email-section">
          <label
            htmlFor="email-section__email-input"
            className="email-section__email-label"
          >
            Email
          </label>
          <input
            required
            autoComplete="off"
            disabled={isPending}
            type="email"
            name="email"
            className="email-section__email-input"
            id="email-section__email-input"
            value={reducerFormState.email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              formDispatch({
                type: "update",
                key: event.target.name,
                value: event.target.value,
              });
            }}
          />
        </div>

        <div className="sign-up-form__password-section">
          <label
            htmlFor="password-section__password-input"
            className="password-section__password-label"
          >
            Password
          </label>
          <input
            required
            autoComplete="off"
            disabled={isPending}
            type="password"
            name="password"
            className="password-section__password-input"
            id="password-section__password-input"
            value={reducerFormState.password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              formDispatch({
                type: "update",
                key: event.target.name,
                value: event.target.value,
              });
            }}
          />
        </div>

        <div className="sign-up-form__button-section">
          <input disabled={isPending} type="submit" value="Submit" />
          <input
            disabled={isPending}
            type="button"
            value="Reset"
            onClick={() => {
              formDispatch({ type: "reset" });
              setErrorState(false);
            }}
          />
        </div>

        {/* form end's */}
      </form>

      <p
        className={`sign-up-container__go-to-sign-up-page go-to-sign-up-page-`}
      >
        Already have account ?{" "}
        <Link
          aria-disabled={isPending}
          tabIndex={isPending ? -1 : undefined}
          className={isPending ? "pointer-events-none" : ""}
          onClick={(e) => isPending && e.preventDefault()}
          href="/LogIn"
        >
          Log In
        </Link>
      </p>

      {isError && (
        <div className="error-message-div">
          {actionState.nameErrorMessage && (
            <p className="errorMessage">{actionState.nameErrorMessage}</p>
          )}
          {actionState.emailErrorMessage && (
            <p className="errorMessage">{actionState.emailErrorMessage}</p>
          )}
          {actionState.passwordErrorMessage && (
            <p className="errorMessage">{actionState.passwordErrorMessage}</p>
          )}
          {actionState.defaultErrorMessage && (
            <p className="errorMessage">{actionState.defaultErrorMessage}</p>
          )}
        </div>
      )}
    </div>
  );
}
