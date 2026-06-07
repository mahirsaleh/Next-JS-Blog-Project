import { Metadata } from "next";

import CreatePageForm from "@/src/components/CreatePageForm";

import "@/src/css/createBlog.css";

export const metadata: Metadata = {
  title: "Basic Blog | Create Page",
  description: "This is Create Page of Basic Next.js Blog Project",
};

export default function Create() {
  return (
    <div className="create-container">
      <h1 className="create-container__heading">Create Post</h1>

      <CreatePageForm />
    </div>
  );
}
