import { client } from "@/sanity/lib/client";
import VideoLibrary from "@/components/VideoLibrary";

export const metadata = {
  title: "Video Library | HTR",
  description: "A collection of all video briefings and content from our intelligence platform.",
};

export const revalidate = 60; 

async function getVideos() {
  const query = `*[_type == "policyAnalysis" && count(body[_type in ["video", "youtube", "mux.video"]]) > 0] | order(_createdAt desc) {
    "videos": body[_type in ["video", "youtube", "mux.video"]]{
      ...,
      "articleId": ^._id,
      "articleTitle": ^.title,
      "articleSlug": ^.slug.current,
      "pillar": ^.pillar,
      "category": ^.category 
    }
  }`;

  const articlesWithVideos: { videos: unknown[] }[] = await client.fetch(query);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return articlesWithVideos.flatMap((article) => article.videos) as any[];
}

export default async function VideosPage() {
  const allVideos = await getVideos();

  return <VideoLibrary allVideos={allVideos} />;
}
