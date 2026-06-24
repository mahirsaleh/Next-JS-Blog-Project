// app/manifest.ts
import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Next.js Blog Project",
    short_name: "OurBlog",
    description:
      "This is a Next.js with Convex Blog Project. Any kind of Blog can be written here",
    start_url: "/",
    display: "standalone",
    background_color: "hsl(0, 0%, 50%)",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
