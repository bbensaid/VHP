import { NextResponse } from "next/server";
import { getWireFeed } from "@/lib/wire/feed";

// Feed logic lives in lib/wire/feed.ts so pages can call it directly.
export async function GET(request: Request) {
  // ?nocache=1 forces a live re-fetch + re-decode, bypassing the Supabase
  // cache. Useful after a parser/decoder change so stale-decoded headlines
  // don't linger for up to 15 minutes.
  const noCache = new URL(request.url).searchParams.get("nocache") === "1";
  return NextResponse.json(await getWireFeed({ noCache }));
}
