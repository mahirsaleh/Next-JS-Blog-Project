// "use cache";

import { Metadata } from "next";

import Blogs from "./_BlogComponents/Blogs";

import "@/src/css/blogPage.css";
import { getBlogDataFunction } from "@/app/actions";
import { connection } from "next/server";
// import { cacheLife, cacheTag } from "next/cache";

export const metadata: Metadata = {
  title: "Basic Blog | Blogs Page",
  description: "This is Blogs Page of Basic Next.js Blog Project",
};

export default async function Blog() {
  // cacheLife("max");
  // cacheTag("blogPage");
  // await connection()

  await connection()

  let preloadedBlogs;

  try {
    preloadedBlogs = await getBlogDataFunction();
  } catch (error) {
    throw error;
  }

  return (
    <div className="blog-container">
      <h1 className="blog-container__heading">Our Blogs</h1>

      <Blogs preloadedBlogs={preloadedBlogs} />
    </div>
  );
}
