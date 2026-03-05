import { NextResponse } from "next/server";

const CLIENT_ID     = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!;

const TOKEN_ENDPOINT       = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";

async function getAccessToken(): Promise<string> {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type:    "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
    cache: "no-store",
  });

  const data = await res.json();
  return data.access_token;
}

export async function GET() {
  try {
    const access_token = await getAccessToken();

    const res = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
      cache: "no-store",
    });

    // 204 = nothing playing, 401/403 = bad token
    if (res.status === 204 || res.status >= 400) {
      return NextResponse.json({ isPlaying: false });
    }

    const data = await res.json();

    if (!data?.item) {
      return NextResponse.json({ isPlaying: false });
    }

    return NextResponse.json({
      isPlaying: data.is_playing,
      title:     data.item.name,
      artist:    data.item.artists.map((a: { name: string }) => a.name).join(", "),
      album:     data.item.album.name,
      albumArt:  data.item.album.images[0]?.url ?? null,
      songUrl:   data.item.external_urls.spotify,
    });
  } catch {
    return NextResponse.json({ isPlaying: false });
  }
}
