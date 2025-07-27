"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, GitCommit, Star, GitFork } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

// Mock GitHub activity data
const githubStats = {
  totalCommits: 847,
  totalStars: 156,
  totalRepos: 42,
  contributionStreak: 23,
}

const recentActivity = [
  {
    type: "commit",
    repo: "ai-sentiment-analyzer",
    message: "Improved model accuracy by 3% with data augmentation",
    time: "2 hours ago",
    language: "Python",
  },
  {
    type: "star",
    repo: "react-task-manager",
    message: "Starred by 5 new users",
    time: "1 day ago",
    language: "JavaScript",
  },
  {
    type: "commit",
    repo: "computer-vision-detector",
    message: "Added real-time video processing capability",
    time: "2 days ago",
    language: "Python",
  },
  {
    type: "fork",
    repo: "ml-algorithms-collection",
    message: "Forked by 3 developers",
    time: "3 days ago",
    language: "Python",
  },
]

export function GitHubActivity() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">GitHub Activity</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Active contributor with consistent coding habits and open-source involvement
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* GitHub Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Github className="h-5 w-5" />
                  <span>GitHub Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{githubStats.totalCommits}</div>
                    <div className="text-sm text-muted-foreground">Total Commits</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{githubStats.totalStars}</div>
                    <div className="text-sm text-muted-foreground">Stars Earned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{githubStats.totalRepos}</div>
                    <div className="text-sm text-muted-foreground">Repositories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{githubStats.contributionStreak}</div>
                    <div className="text-sm text-muted-foreground">Day Streak</div>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="https://github.com" target="_blank">
                    <Github className="mr-2 h-4 w-4" />
                    View GitHub Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest contributions and project updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-shrink-0 mt-1">
                        {activity.type === "commit" && <GitCommit className="h-4 w-4 text-green-500" />}
                        {activity.type === "star" && <Star className="h-4 w-4 text-yellow-500" />}
                        {activity.type === "fork" && <GitFork className="h-4 w-4 text-blue-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-sm">{activity.repo}</span>
                          <Badge variant="outline" className="text-xs">
                            {activity.language}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{activity.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
