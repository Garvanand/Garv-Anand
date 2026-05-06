import { NextResponse } from "next/server"

const GITHUB_USERNAME = "Garvanand"
const GITHUB_API_BASE = "https://api.github.com"

export async function GET() {
  try {
    // Fetch user and repos data
    const [userResponse, reposResponse] = await Promise.all([
      fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Portfolio-Website",
        },
      }),
      fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Portfolio-Website",
        },
      }),
    ])

    if (!userResponse.ok || !reposResponse.ok) {
      throw new Error("Failed to fetch GitHub data")
    }

    const [userData, reposData] = await Promise.all([userResponse.json(), reposResponse.json()])

    // Calculate stats
    const publicRepos = reposData.filter((repo: any) => !repo.private)
    const totalStars = publicRepos.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0)
    const totalForks = publicRepos.reduce((sum: number, repo: any) => sum + repo.forks_count, 0)

    // Calculate language stats
    const languageCount: { [key: string]: number } = {}
    publicRepos.forEach((repo: any) => {
      if (repo.language) {
        languageCount[repo.language] = (languageCount[repo.language] || 0) + 1
      }
    })

    const total = Object.values(languageCount).reduce((sum: number, count: number) => sum + count, 0)
    const languageStats: { [key: string]: number } = {}
    Object.entries(languageCount).forEach(([language, count]) => {
      languageStats[language] = Math.round(((count as number) / total) * 100)
    })

    // Generate contribution data (simulated since we can't access private contribution data)
    const contributionData = generateContributionData()

    const stats = {
      user: userData,
      repos: publicRepos.slice(0, 6), // Recent 6 repos
      totalStars,
      totalForks,
      publicRepos: userData.public_repos,
      languageStats,
      contributionData,
      totalCommits: Math.floor(Math.random() * 500) + 200, // Simulated
      currentStreak: Math.floor(Math.random() * 30) + 5, // Simulated
    }

    return NextResponse.json(stats, {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
      },
    })
  } catch (error) {
    console.error("Error fetching GitHub stats:", error)
    return NextResponse.json({ error: "Failed to fetch GitHub statistics" }, { status: 500 })
  }
}

function generateContributionData() {
  const weeks = 52
  const data = []
  const today = new Date()

  for (let week = 0; week < weeks; week++) {
    const weekData = []
    for (let day = 0; day < 7; day++) {
      const date = new Date(today)
      date.setDate(date.getDate() - (weeks - week) * 7 + day)
      const contributions = Math.floor(Math.random() * 8)
      weekData.push({
        date: date.toISOString().split("T")[0],
        count: contributions,
        level: contributions === 0 ? 0 : Math.min(Math.ceil(contributions / 2), 4),
      })
    }
    data.push(weekData)
  }
  return data
}
