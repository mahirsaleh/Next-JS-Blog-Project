"use server";

import { api } from "@/convex/_generated/api";
import { getToken } from "@/src/libs/auth-server";
import { fetchMutation, preloadQuery } from "convex/nextjs";
import { updateTag } from "next/cache";
import { fetchQuery } from "convex/nextjs";
import { Id } from "@/convex/_generated/dataModel";
import { getPlaiceholder } from "plaiceholder";
import { Preloaded } from "convex/react";
// import { createPostComments } from "@/convex/postComments";

/* generateBlurDataURL starts */

export async function generateBlurDataURL(imageUrl: string) {
  try {
    const res = await fetch(imageUrl);
    const buffer = Buffer.from(await res.arrayBuffer());

    const { base64 } = await getPlaiceholder(buffer, { size: 10 });
    return base64;
  } catch (error) {
    console.error("Error generating blur data:", error);
    throw new Error("Failed to generate image blur");
  }
}
/* generateBlurDataURL ends */

/* createPostSubmitFunction stats */
type TProperty = {
  body: string;
  title: string;
  image: File;
};

export const createPostSubmitFunction = async function ({
  body,
  title,
  image,
}: TProperty) {
  try {
    const token = await getToken();

    const imgURL = await fetchMutation(
      api.posts.generateImageUploadURL,
      {},
      { token },
    );

    const uploadImgURL = await fetch(imgURL, {
      method: "POST",
      headers: {
        "Content-Type": image.type,
      },
      body: image,
    });

    if (!uploadImgURL.ok) {
      throw new Error("uploadImgURL Error");
    }

    const { storageId } = await uploadImgURL.json();

    // getting imageURL from convex ;
    const publicImageUrl = await fetchQuery(
      api.posts.getImageUrl,
      { imageStorageID: storageId },
      { token },
    );

    if (!publicImageUrl) {
      throw new Error("Could not retrieve public image URL");
    }

    const imageBlurDataURL = await generateBlurDataURL(publicImageUrl);

    await fetchMutation(
      api.posts.createPosts,
      {
        body: body,
        title: title,
        imageStorageID: storageId,
        imageBlurDataURL: imageBlurDataURL,
      },
      { token },
    );

    updateTag("blogPage");

    return;
  } catch (error) {
    const postError =
      error instanceof Error ? error : new Error("Something Went Wrong");

    throw postError;
  }
};
/* createPostSubmitFunction ends */

/* getBlogDataFunction starts */

// type getBlogDataFunctionReturnType = Promise<
//   {
//     imageURL: string | null;
//     _id: Id<"posts">;
//     _creationTime: number;
//     body: string;
//     title: string;
//     authorID: string;
//     imageStorageID: Id<"_storage">;
//     imageBlurDataURL: string;
//   }[]
// >;

type getBlogDataFunctionReturnType = Promise<
  Preloaded<typeof api.posts.getPosts>
>;

export const getBlogDataFunction =
  async function (): getBlogDataFunctionReturnType {
    try {
      const blogsData = await preloadQuery(api.posts.getPosts);

      return blogsData;

      // console.log(blogsData);
    } catch (error) {
      const blogPageError =
        error instanceof Error ? error : new Error("Something Went Wrong");

      throw blogPageError;
    }
  };
/* getBlogDataFunction ends */

/* singleBlogFunction starts */

type TSingleBlogFunctionProperty = {
  postID: Id<"posts">;
};

type TSingleBlogFunctionReturnType = Promise<{
  imageURL: string | null;
  _id?: Id<"posts"> | undefined;
  _creationTime?: number | undefined;
  body?: string | undefined;
  title?: string | undefined;
  authorID?: string | undefined;
  authorName?: string | undefined;
  imageStorageID?: Id<"_storage"> | undefined;
  imageBlurDataURL?: string | undefined;
}>;

export const singleBlogFunction = async function ({
  postID,
}: TSingleBlogFunctionProperty): TSingleBlogFunctionReturnType {
  try {
    const postData = await fetchQuery(api.posts.singleBlogWithID, { postID });

    return postData;
  } catch (error) {
    const singleBlogError =
      error instanceof Error ? error : new Error("SomeThing went wrong!");

    throw singleBlogError;
  }
};

/* singleBlogFunction ends */

/* DeleteBlogFunction starts */
export const deleteBlogFunction = async function ({
  postId,
}: {
  postId: Id<"posts">;
}): Promise<{ success: true }> {
  try {
    const token = await getToken();
    await fetchMutation(
      api.posts.deletePost,
      {
        postId: postId,
      },
      { token },
    );

    updateTag("blogPage");

    return {
      success: true,
    };
  } catch (error) {
    const deletePostError =
      error instanceof Error ? error : new Error("SomeThing went wrong!");

    throw deletePostError;
  }
};
/* DeleteBlogFunction ends */

/* deleteBlogCommentFunction starts */

type TDeleteBlogCommentFunctionProperty = {
  commentID: Id<"postComments">;
  blogID: Id<"posts">;
};

export const deleteBlogCommentFunction = async function ({
  commentID,
  blogID,
}: TDeleteBlogCommentFunctionProperty): Promise<{ success: true }> {
  try {
    const token = await getToken();

    await fetchMutation(
      api.postComments.deletePostComment,
      {
        commentID: commentID,
      },
      { token },
    );

    updateTag(`singleBlogPage-${blogID}`);

    return {
      success: true,
    };
  } catch (error) {
    const deleteCommentError =
      error instanceof Error ? error : new Error("SomeThing went wrong!");

    throw deleteCommentError;
  }
};
/* deleteBlogCommentFunction ends */

/* BlogComment starts */

type TSubmitBlogCommentProperty = { commentBody: string; blogID: Id<"posts"> };

export const submitBlogCommentFunction = async function ({
  commentBody,
  blogID,
}: TSubmitBlogCommentProperty) {
  try {
    const token = await getToken();

    await fetchMutation(
      api.postComments.createPostComments,
      {
        body: commentBody,
        postID: blogID,
      },
      { token: token },
    );
    updateTag(`singleBlogPage-${blogID}`);
  } catch (error) {
    const submitBlogCommentError =
      error instanceof Error ? error : new Error("Something Went Wrong");
    throw submitBlogCommentError;
  }
};

type TBlogCommentFunctionProperty = {
  blogID: Id<"posts">;
};

export const getBlogCommentFunction = async function ({
  blogID,
}: TBlogCommentFunctionProperty) {
  try {
    const commentList = await preloadQuery(api.postComments.getPostComments, {
      postID: blogID,
    });

    return commentList;
  } catch (error) {
    const getBlogCommentFunctionError =
      error instanceof Error ? error : new Error("Something Went Wrong");

    throw getBlogCommentFunctionError;
  }
};

/* BlogComment ends */
