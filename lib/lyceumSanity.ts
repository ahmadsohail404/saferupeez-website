// lib/lyceumSanity.ts
import { sanityClient } from "./sanity.client";
import { urlForImage } from "@/lib/images";

export interface Chapter {
  id: string;
  title: string;
  description?: string;
  duration?: string;
  videoId?: string;
  content?: any;
  thumbnailUrl?: string;  // 👈 will hold final URL
}

export interface LyceumModule {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;      // 👈 final URL for cover image
  chapters: number;
  chapterList: Chapter[];
}

const MODULES_QUERY = `
*[_type == "module"] | order(order asc) {
  _id,
  title,
  description,
  coverImage,                // 👈 full image object
  chapters[]{
    _key,
    title,
    description,
    duration,
    videoId,
    content,
    thumbnail               // 👈 full image object
  }
}
`;

export async function fetchLyceumModules(): Promise<LyceumModule[]> {
  const sanityModules = await sanityClient.fetch(MODULES_QUERY);

  return sanityModules.map((m: any) => {
    const chapterList: Chapter[] =
      m.chapters?.map((ch: any) => ({
        id: ch._key,
        title: ch.title,
        description: ch.description,
        duration: ch.duration,
        videoId: ch.videoId,
        content: ch.content,
        thumbnailUrl: ch.thumbnail
          ? urlForImage(ch.thumbnail).width(400).height(225).url()
          : undefined,
      })) ?? [];

    return {
      id: m._id,
      title: m.title,
      description: m.description,
      imageUrl: m.coverImage
        ? urlForImage(m.coverImage).width(800).height(450).url()
        : undefined,
      chapters: chapterList.length,
      chapterList,
    };
  });
}
