import { getBlogCommentFunction, singleBlogFunction } from "@/app/actions";
import { Id } from "@/convex/_generated/dataModel";
import { notFound } from "next/navigation";
import Image from "next/image";

import BlogComments from "./_singleBlogComments/BlogComments";

import MadinaImage from "@/src/assets/Medina 1.jpg";

import "@/src/css/singleBlogPage.css";
import { Metadata } from "next";

// import { cacheLife, cacheTag } from "next/cache";
import BlogDeleteButton from "./_blogDeleteButtons/BlogDeleteButton";
import DeletePopUp from "./_blogDeleteButtons/DeletePopUp";
import DeletePostWrapper from "@/src/contextProviders/DeletePostWrapper";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

type TProps = {
  params: Promise<{ blogID: Id<"posts"> }>;
};

export async function generateMetadata({ params }: TProps): Promise<Metadata> {
  try {
    const { blogID } = await params;
    const singleBlogData = await fetchQuery(api.posts.singleBlogWithID, {
      postID: blogID,
    });

    if (!singleBlogData) {
      return {
        title: "No Blog Found",
        description: "Currently there is no blog has been posted",
      };
    }

    return {
      title: singleBlogData.title,
      description: `This page is a blog page about ${singleBlogData.title}`,
    };
  } catch (error) {
    throw error;
  }
}

export default async function SingleBlog({ params }: TProps) {
  // cacheLife("max");

  let singleBlogData;
  // let blogId;
  let preloadedComments;

  try {
    const { blogID } = await params;

    // blogId = blogID;

    // [singleBlogData, preloadedComments] = await Promise.all([
    //   singleBlogFunction({ postID: blogId }),
    //   getBlogCommentFunction({ blogID: blogId }),
    // ]);

    [singleBlogData, preloadedComments] = await Promise.all([
      fetchQuery(api.posts.singleBlogWithID, { postID: blogID }),
      preloadQuery(api.postComments.getPostComments, { postID: blogID }),
    ]);

    // cacheTag(`singleBlogPage-${blogID}`);
  } catch (error) {
    console.error(error);

    return notFound();
  }

  return (
    <div className="single-blog-container">
      <div className="single-blog-container__post-header">
        <h1 className="post-header__post-title">{singleBlogData.title}</h1>
        <p className="post-header__post-creation-time">
          {new Date(singleBlogData._creationTime!).toLocaleString()}
        </p>
        <p className="post-header__post-creation-time post-header__authorName">
          Author Name - {singleBlogData.authorName}
        </p>
      </div>
      <div className="single-blog-container__single-blog-container-image-div">
        <Image
          className="single-blog-contaier-image-div__image"
          src={singleBlogData.imageURL ?? MadinaImage}
          alt={singleBlogData.title!}
          width={1000}
          height={100}
          loading="eager"
        />
      </div>
      <p className="single-blog-container__post-body">{singleBlogData.body}</p>

      <DeletePostWrapper>
        <DeletePopUp />

        <BlogComments preloadedComments={preloadedComments} />

        <BlogDeleteButton
          authorID={singleBlogData.authorID!}
          imageStorageID={singleBlogData.imageStorageID!}
        />
      </DeletePostWrapper>
    </div>
  );
}
