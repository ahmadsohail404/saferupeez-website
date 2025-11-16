// lib/images.ts
import imageUrlBuilder from "@sanity/image-url";
import type { SanityClient } from "next-sanity";
import { sanityClient } from "./sanity.client";

// Create a single image URL builder instance
const builder = imageUrlBuilder(sanityClient as SanityClient);

/**
 * Helper to build Sanity image URLs with chaining:
 * urlForImage(source).width(800).height(450).url()
 */
export function urlForImage(source: any) {
  return builder.image(source).auto("format").fit("max");
}
