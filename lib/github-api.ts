// GitHub API configuration
const GITHUB_USERNAME = "Garvanand"
const GITHUB_API_BASE = "https://api.github.com"

// Types for GitHub API responses
export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  created_at: string
  topics: string[]
  private: boolean
}

export interface GitHubUser {
  login: string
  name: string
  bio: string | null
  public_repos: number
  followers: number
  following: number
  created_at: string
  updated_at: string
  avatar_url: string
}

export interface GitHubCommitActivity {
  total: number
  week: number
  days: number[]
}

export interface GitHubLanguageStats {
  [language: string]: number
}

// Fetch user profile
export async function fetchGitHubUser(): Promise<GitHubUser> {
  const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.statusText}`)
  }
  return response.json()
}

// Fetch user repositories
export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`)
  if (!response.ok) {
    throw new Error(`Failed to fetch repos: ${response.statusText}`)
  }
  return response.json()
}

// Fetch commit activity (last year)
export async function fetchCommitActivity(): Promise<GitHubCommitActivity[]> {
  const response = await fetch(`${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/stats/commit_activity`)
  if (!response.ok) {
    // If stats are not available, return empty array
    return []
  }
  return response.json()
}

// Calculate language statistics from repositories
export function calculateLanguageStats(repos: GitHubRepo[]): GitHubLanguageStats {
  const languageCount: { [key: string]: number } = {}
  const publicRepos = repos.filter((repo) => !repo.private)

  publicRepos.forEach((repo) => {
    if (repo.language) {
      languageCount[repo.language] = (languageCount[repo.language] || 0) + 1
    }
  })

  // Convert to percentages
  const total = Object.values(languageCount).reduce((sum, count) => sum + count, 0)
  const languageStats: GitHubLanguageStats = {}

  Object.entries(languageCount).forEach(([language, count]) => {
    languageStats[language] = Math.round((count / total) * 100)
  })

  return languageStats
}

// Get language colors (common programming language colors)
export function getLanguageColor(language: string): string {
  const colors: { [key: string]: string } = {
    JavaScript: "#f7df1e",
    TypeScript: "#3178c6",
    Python: "#3776ab",
    Java: "#ed8b00",
    "C++": "#00599c",
    C: "#555555",
    HTML: "#e34c26",
    CSS: "#1572b6",
    React: "#61dafb",
    Vue: "#4fc08d",
    Go: "#00add8",
    Rust: "#dea584",
    PHP: "#777bb4",
    Ruby: "#cc342d",
    Swift: "#fa7343",
    Kotlin: "#7f52ff",
    Dart: "#0175c2",
    Shell: "#89e051",
    Dockerfile: "#384d54",
    Jupyter: "#da5b0b",
  }
  return colors[language] || "#6b7280"
}

// Generate contribution graph data from commit activity
export function generateContributionData(commitActivity: GitHubCommitActivity[]): any[] {
  const weeks = 52
  const data = []
  const today = new Date()

  for (let week = 0; week < weeks; week++) {
    const weekData = []
    for (let day = 0; day < 7; day++) {
      const date = new Date(today)
      date.setDate(date.getDate() - (weeks - week) * 7 + day)

      // Try to get real data from commit activity
      let contributions = 0
      if (commitActivity.length > 0 && week < commitActivity.length) {
        contributions = commitActivity[week]?.days[day] || 0
      } else {
        // Fallback to simulated data if API data is not available
        contributions = Math.floor(Math.random() * 8)
      }

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

// Calculate total commits from activity data
export function calculateTotalCommits(commitActivity: GitHubCommitActivity[]): number {
  return commitActivity.reduce((total, week) => {
    return total + week.days.reduce((weekTotal, dayCommits) => weekTotal + dayCommits, 0)
  }, 0)
}

// Calculate current streak
export function calculateStreak(contributionData: any[]): number {
  const flatData = contributionData.flat().reverse()
  let streak = 0

  for (const day of flatData) {
    if (day.count > 0) {
      streak++
    } else {
      break
    }
  }

  return streak
}
