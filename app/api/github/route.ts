import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://api.github.com/users/priest-2105/repos?sort=updated&per_page=100",
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "fawazbailey.com portfolio",
        },
        next: { revalidate: 3600 },
      }
    );

    const repos = await res.json();

    const filtered = repos
      .filter((r: { fork: boolean }) => !r.fork)
      .map((r: {
        name: string;
        description: string | null;
        html_url: string;
        stargazers_count: number;
        language: string | null;
        updated_at: string;
        homepage: string | null;
      }) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        stars: r.stargazers_count,
        language: r.language,
        updatedAt: r.updated_at,
        homepage: r.homepage || null,
      }));

    return NextResponse.json(filtered);
  } catch {
    return NextResponse.json([]);
  }
}
