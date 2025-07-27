// Client-side GitHub API functions that call our Next.js API routes

export interface GitHubStats {
    user: {
      login: string
      name: string
      bio: string | null
      public_repos: number
      followers: number
      following: number
      avatar_url: string
    }
    repos: Array<{
      id: number
      name: string
      full_name: string
      description: string | null
      html_url: string
      language: string | null
      stargazers_count: number
      forks_count: number
      updated_at: string
      topics: string[]
    }>
    totalStars: number
    totalForks: number
    publicRepos: number
    languageStats: { [key: string]: number }
    contributionData: any[]
    totalCommits: number
    currentStreak: number
  }
  
  export async function fetchGitHubStats(): Promise<GitHubStats> {
    const response = await fetch("/api/github/stats")
    if (!response.ok) {
      throw new Error(`Failed to fetch GitHub stats: ${response.statusText}`)
    }
    return response.json()
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
  