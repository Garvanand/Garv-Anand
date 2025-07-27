"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, GitCommit, Star, GitFork, ExternalLink, Loader2, AlertCircle, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { fetchGitHubStats, getLanguageColor, type GitHubStats } from "@/lib/github-client"

export function RealGitHubActivity() {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hoveredDay, setHoveredDay] = useState<any>(null)

  const loadGitHubData = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchGitHubStats()
      setStats(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch GitHub data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadGitHubData()
  }, [])

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground">Loading GitHub data...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-8">
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Failed to load GitHub data</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <div className="flex gap-2 justify-center">
              <Button onClick={loadGitHubData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              <Button variant="outline" asChild>
                <Link href="https://github.com/Garvanand" target="_blank">
                  <Github className="h-4 w-4 mr-2" />
                  View GitHub Profile
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="space-y-8">
        <Card>
          <CardContent className="p-8 text-center">
            <Github className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No GitHub data available</h3>
            <p className="text-muted-foreground">Unable to fetch GitHub information at this time.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getLevelColor = (level: number) => {
    const colors = {
      0: "bg-muted",
      1: "bg-green-200 dark:bg-green-900",
      2: "bg-green-300 dark:bg-green-700",
      3: "bg-green-400 dark:bg-green-600",
      4: "bg-green-500 dark:bg-green-500",
    }
    return colors[level as keyof typeof colors] || colors[0]
  }

  // Get top languages (limit to 5)
  const topLanguages = Object.entries(stats.languageStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([language, percentage]) => ({
      name: language,
      percentage,
      color: getLanguageColor(language),
    }))

  return (
    <div className="space-y-8">
      {/* GitHub Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Commits",
            value: stats.totalCommits,
            icon: GitCommit,
            color: "text-blue-500",
          },
          {
            label: "Stars Earned",
            value: stats.totalStars,
            icon: Star,
            color: "text-yellow-500",
          },
          {
            label: "Public Repos",
            value: stats.publicRepos,
            icon: Github,
            color: "text-gray-500",
          },
          {
            label: "Current Streak",
            value: stats.currentStreak,
            icon: GitFork,
            color: "text-green-500",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4 text-center">
                <stat.icon className={`h-5 w-5 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Contribution Graph */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Github className="h-5 w-5" />
              <span>GitHub Contributions</span>
            </span>
            <Button variant="outline" size="sm" asChild>
              <Link href={`https://github.com/${stats.user.login}`} target="_blank">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Profile
              </Link>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-1 justify-center overflow-x-auto">
              {stats.contributionData.map((week: any, weekIndex: number) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day: any, dayIndex: number) => (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`w-3 h-3 rounded-sm cursor-pointer transition-all duration-200 hover:scale-110 ${getLevelColor(
                        day.level,
                      )}`}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      title={`${day.count} contributions on ${day.date}`}
                    />
                  ))}
                </div>
              ))}
            </div>

            {hoveredDay && (
              <div className="text-center text-sm text-muted-foreground">
                {hoveredDay.count} contributions on {new Date(hoveredDay.date).toLocaleDateString()}
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Less</span>
              <div className="flex space-x-1">
                {[0, 1, 2, 3, 4].map((level) => (
                  <div key={level} className={`w-3 h-3 rounded-sm ${getLevelColor(level)}`} />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language Distribution */}
      {topLanguages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Most Used Languages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topLanguages.map((lang, index) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: lang.color }} />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{lang.name}</span>
                      <span className="text-sm text-muted-foreground">{lang.percentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full"
                        style={{ backgroundColor: lang.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${lang.percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Repositories */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Repositories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.repos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Link
                      href={repo.html_url}
                      target="_blank"
                      className="font-semibold text-primary hover:underline cursor-pointer"
                    >
                      {repo.name}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {repo.description || "No description available"}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      {repo.language && (
                        <div className="flex items-center space-x-1">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: getLanguageColor(repo.language) }}
                          />
                          <span className="text-xs text-muted-foreground">{repo.language}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3" />
                        <span className="text-xs text-muted-foreground">{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitFork className="h-3 w-3" />
                        <span className="text-xs text-muted-foreground">{repo.forks_count}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Updated {new Date(repo.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {repo.topics.slice(0, 3).map((topic) => (
                          <Badge key={topic} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
