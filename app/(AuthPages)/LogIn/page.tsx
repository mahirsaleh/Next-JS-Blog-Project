import { Metadata } from "next";

import LogInForm from "@/src/components/AuthForm/LogInForm";

export const metadata: Metadata = {
  title: "Basic Blog | Log In",
  description: "This is Log In Page of Basic Next.js Blog Project",
};

export default function SignUp() {
  return <LogInForm />;
}
