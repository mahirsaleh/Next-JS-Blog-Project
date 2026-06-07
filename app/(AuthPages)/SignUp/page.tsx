import { Metadata } from "next";

import SignUpForm from "@/src/components/AuthForm/SignUpForm";

export const metadata: Metadata = {
  title: "Basic Blog | Sign Up",
  description: "This is Sign Up Page of Basic Next.js Blog Project",
};

export default function SignUp() {
  return <SignUpForm />;
}
