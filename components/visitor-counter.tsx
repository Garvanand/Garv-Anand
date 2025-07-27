"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Users, Globe, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

export function VisitorCounter() {
  const [stats, setStats] = useState({
    totalVisitors: 0,
    todayVisitors: 0,
    uniqueCountries: 0,
    pageViews: 0,
  })

  useEffect(() => {
    // Simulate visitor counter with localStorage
    const getVisitorStats = () => {
      const today = new Date().toDateString()
      const storedData = localStorage.getItem("portfolioStats")

      let data = {
        totalVisitors: 1247,
        todayVisitors: 3,
        uniqueCountries: 3,
        pageViews: 3421,
        lastVisit: today,
        todayCount: 1,
      }

      if (storedData) {
        const parsed = JSON.parse(storedData)
        if (parsed.lastVisit === today) {
          data = { ...parsed, todayCount: parsed.todayCount + 1 }
        } else {
          data = {
            ...parsed,
            totalVisitors: parsed.totalVisitors + 1,
            todayVisitors: 1,
            pageViews: parsed.pageViews + Math.floor(Math.random() * 5) + 1,
            lastVisit: today,
            todayCount: 1,
          }
        }
      }

      localStorage.setItem("portfolioStats", JSON.stringify(data))
      return data
    }

    const data = getVisitorStats()

    // Animate counter
    const animateCounter = (target: number, setter: (value: number) => void) => {
      let current = 0
      const increment = target / 50
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        setter(Math.floor(current))
      }, 30)
    }

    setTimeout(() => {
      animateCounter(data.totalVisitors, (value) => setStats((prev) => ({ ...prev, totalVisitors: value })))
      animateCounter(data.todayVisitors, (value) => setStats((prev) => ({ ...prev, todayVisitors: value })))
      animateCounter(data.uniqueCountries, (value) => setStats((prev) => ({ ...prev, uniqueCountries: value })))
      animateCounter(data.pageViews, (value) => setStats((prev) => ({ ...prev, pageViews: value })))
    }, 500)
  }, [])

  const statItems = [
    {
      icon: Eye,
      label: "Total Visitors",
      value: stats.totalVisitors,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Users,
      label: "Today's Visitors",
      value: stats.todayVisitors,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: Globe,
      label: "Countries",
      value: stats.uniqueCountries,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: TrendingUp,
      label: "Page Views",
      value: stats.pageViews,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ]

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Portfolio Analytics</h3>
          <Badge variant="secondary" className="text-xs">
            Live Stats
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`inline-flex p-3 rounded-lg ${item.bgColor} mb-2`}>
                <item.icon className={`h-5 w-5 ${item.color}`} />
              </div>
              <div className="text-2xl font-bold">{item.value.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
