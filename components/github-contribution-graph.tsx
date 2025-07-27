"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, GitCommit, Star, GitFork, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

// Simulated GitHub data based on Garv's actual profile
const githubData = {
  username: "Garvanand",
  totalCommits: 342,
  totalStars: 28,
  totalRepos: 15,
  contributionStreak: 12,
  languages: [
    { name: "Python", percentage: 45, color: "#3776ab" },
    { name: "JavaScript", percentage: 25, color: "#f7df1e" },
    { name: "TypeScript", percentage: 15, color: "#3178c6" },
    { name: "C++", percentage: 10, color: "#00599c" },
    { name: "Other", percentage: 5, color: "#6b7280" },
  ],
  recentRepos: [
    {
      name: "Multimodal-Speech-Emotion-Recognition",
      description: "Deep learning framework for emotion recognition using Bi-LSTM and Transformers",
      language: "Python",
      stars: 8,
      forks: 2,
      updated: "2 days ago",
    },
    {
      name: "Advanced-Parkinsons-Detection",
      description: "Bi-LSTM model for early Parkinson's disease detection via speech analysis",
      language: "Python",
      stars: 12,
      forks: 3,
      updated: "1 week ago",
    },
    {
      name: "VITAL-AI",
      description: "Comprehensive health monitoring platform with ML-based risk prediction",
      language: "JavaScript",
      stars: 6,
      forks: 1,
      updated: "2 weeks ago",
    },
    {
      name: "Document-Approval-System",
      description: "React-based platform for streamlining university document approval process",
      language: "JavaScript",
      stars: 4,
      forks: 1,
      updated: "3 weeks ago",
    },
  ],
}

// Generate contribution graph data
const generateContributionData = () => {
  const weeks = 52
  const data = []
  const today = new Date()

  for (let week = 0; week < weeks; week++) {
    const weekData = []
    for (let day = 0; day < 7; day++) {
      const date = new Date(today)
      date.setDate(date.getDate() - (weeks - week) * 7 + day)
      const contributions = Math.floor(Math.random() * 8) // 0-7 contributions per day
      weekData.push({
        date: date.toISOString().split("T")[0],
        count: contributions,
        level: contributions === 0 ? 0 : Math.ceil(contributions / 2),
      })
    }
    data.push(weekData)
  }
  return data
}

export function GitHubContributionGraph() {
  const [contributionData, setContributionData] = useState<any[]>([])
  const [hoveredDay, setHoveredDay] = useState<any>(null)

  useEffect(() => {
    setContributionData(generateContributionData())
  }, [])

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

  return (
    <div className="space-y-8">
      {/* GitHub Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Commits", value: githubData.totalCommits, icon: GitCommit, color: "text-blue-500" },
          { label: "Stars Earned", value: githubData.totalStars, icon: Star, color: "text-yellow-500" },
          { label: "Repositories", value: githubData.totalRepos, icon: Github, color: "text-gray-500" },
          { label: "Day Streak", value: githubData.contributionStreak, icon: GitFork, color: "text-green-500" },
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
              <Link href={`https://github.com/${githubData.username}`} target="_blank">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Profile
              </Link>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-1 justify-center overflow-x-auto">
              {contributionData.map((week, weekIndex) => (
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
      <Card>
        <CardHeader>
          <CardTitle>Most Used Languages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {githubData.languages.map((lang, index) => (
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

      {/* Recent Repositories */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Repositories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {githubData.recentRepos.map((repo, index) => (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-primary hover:underline cursor-pointer">{repo.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{repo.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-blue-500 rounded-full" />
                        <span className="text-xs text-muted-foreground">{repo.language}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3" />
                        <span className="text-xs text-muted-foreground">{repo.stars}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitFork className="h-3 w-3" />
                        <span className="text-xs text-muted-foreground">{repo.forks}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Updated {repo.updated}</span>
                    </div>
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
