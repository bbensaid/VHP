// lib/sanity.ts

import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

// The project ID is public (it ships to the browser); the fallback lets CI
// build without the secret set.
export const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fxz10xl7";

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-10-01",
  // CDN in production for fast cached responses; direct API in dev for live updates
  useCdn: process.env.NODE_ENV === "production",
});

// Helper function to generate image URLs
const builder = createImageUrlBuilder(client);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
