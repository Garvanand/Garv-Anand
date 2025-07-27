import { NextResponse } from "next/server"

const GITHUB_USERNAME = "Garvanand"
const GITHUB_API_BASE = "https://api.github.com"

export async function GET() {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Portfolio-Website",
      },
      next: { revalidate: 1800 }, // Cache for 30 minutes
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching GitHub repos:", error)
    return NextResponse.json({ error: "Failed to fetch GitHub repositories" }, { status: 500 })
  }
}
