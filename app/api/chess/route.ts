import { NextResponse } from "next/server";

const USERNAME = "priest-2105";
const HEADERS = { "User-Agent": "fawazbailey.com portfolio" };

interface ChessGame {
  white: { username: string; rating: number; result: string };
  black: { username: string; rating: number; result: string };
  time_class: string;
  time_control: string;
  end_time: number;
  url: string;
}

async function getLatestGames(): Promise<ChessGame[]> {
  const archivesRes = await fetch(
    `https://api.chess.com/pub/player/${USERNAME}/games/archives`,
    { headers: HEADERS, next: { revalidate: 300 } }
  );
  const { archives } = await archivesRes.json();
  if (!archives?.length) return [];

  // fetch the most recent two archives in case the latest is sparse
  const recents = archives.slice(-2).reverse();
  for (const url of recents) {
    const res = await fetch(url, { headers: HEADERS, next: { revalidate: 300 } });
    const data = await res.json();
    const games: ChessGame[] = data.games ?? [];
    if (games.length) return games.slice(-10).reverse(); // last 10, newest first
  }
  return [];
}

async function getStats() {
  const res = await fetch(
    `https://api.chess.com/pub/player/${USERNAME}/stats`,
    { headers: HEADERS, next: { revalidate: 300 } }
  );
  return res.json();
}

export async function GET() {
  try {
    const [games, stats] = await Promise.all([getLatestGames(), getStats()]);

    const ratings = {
      daily: stats.chess_daily?.last?.rating ?? null,
      rapid: stats.chess_rapid?.last?.rating ?? null,
      blitz: stats.chess_blitz?.last?.rating ?? null,
    };

    const formatted = games.map((g) => {
      const isWhite = g.white.username.toLowerCase() === USERNAME.toLowerCase();
      const me = isWhite ? g.white : g.black;
      const opponent = isWhite ? g.black : g.white;
      const result =
        me.result === "win" ? "win" :
          me.result === "agreed" ? "draw" :
            me.result === "repetition" ? "draw" :
              me.result === "stalemate" ? "draw" : "loss";

      return {
        opponent: opponent.username,
        opponentRating: opponent.rating,
        myRating: me.rating,
        result,
        timeClass: g.time_class,
        endTime: g.end_time,
        url: g.url,
        playedAs: isWhite ? "white" : "black",
      };
    });

    return NextResponse.json({ ratings, games: formatted, username: USERNAME });
  } catch {
    return NextResponse.json({ ratings: {}, games: [], username: USERNAME });
  }
}
