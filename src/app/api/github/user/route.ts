import { NextResponse } from "next/server"

const GITHUB_USERNAME = "Garvanand"
const GITHUB_API_BASE = "https://api.github.com"

export async function GET() {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Portfolio-Website",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching GitHub user:", error)
    return NextResponse.json({ error: "Failed to fetch GitHub user data" }, { status: 500 })
  }
}
