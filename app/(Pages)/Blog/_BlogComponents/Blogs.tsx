"use client";

import { api } from "@/convex/_generated/api";
import { Preloaded, usePreloadedQuery } from "convex/react";

import Image from "next/image";

import mahir from "@/src/assets/mahir.jpg";

import Link from "next/link";

type TProps = {
  preloadedBlogs: Preloaded<typeof api.posts.getPosts>;
};

export default function Blogs({ preloadedBlogs }: TProps) {
  const blogsData = usePreloadedQuery(preloadedBlogs);

  const noBlogs = !blogsData.length;

  return (
    <div
      className="blog-container__blog-section"
      style={
        noBlogs
          ? {
              height: "80svh",
            }
          : {}
      }
    >
      {noBlogs ? (
        <p className="blog-section__no-blog-found">No Blog Found</p>
      ) : (
        blogsData.map((blog) => (
          <div key={blog._id} className="blog-section__blog">
            <Image
              width={1000}
              height={0}
              className="blog__image"
              src={blog.imageURL ?? mahir}
              alt="blogs-image"
              loading="eager"
              placeholder="blur"
              blurDataURL={blog.imageBlurDataURL}
            />

            <div className="blog__text-container">
              <p className="text-container__title">{blog.title}</p>

              <p className="text-container__body">{blog.body}</p>
            </div>

            <div className="blog__button-section">
              <Link
                href={`Blog/${blog._id}`}
                className="blog__read-more-button"
              >
                Read More
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );

  /*
  return (
    <div className="blog-container__blog-section">
      <div className="blog-section__blog">
        <Image
          className="blog__image"
          src={mahir}
          alt="blogs-image"
          loading="eager"
          placeholder="blur"
        />
        <div className="blog__text-container">
          <p className="text-container__title">Mahir Saleh</p>

          <p className="text-container__body">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
            eveniet? Provident eligendi molestiae inventore? Culpa aliquam
            possimus laborum facere nobis veritatis id dicta soluta laboriosam,
            aut odit cum architecto tempora nostrum molestiae vero perspiciatis
            itaque et voluptatibus voluptatem quaerat animi eos eveniet? Eius ad
            voluptatem voluptate, in eum saepe illum!
          </p>
        </div>

        <button type="button" className="blog__read-more-button">
          Read More
        </button>
      </div>
    </div>
  );

  */
}
