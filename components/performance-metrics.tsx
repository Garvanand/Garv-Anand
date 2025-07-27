"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Activity, Cpu, Database, Zap } from "lucide-react"

interface Metric {
  label: string
  value: number
  unit: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

export function PerformanceMetrics() {
  const [metrics, setMetrics] = useState<Metric[]>([
    { label: "Strategic Thinking", value: 0, unit: "/5", icon: Activity, color: "text-green-500" },
    { label: "Speed", value: 0, unit: "/5", icon: Zap, color: "text-blue-500" },
    { label: "Problem Solving", value: 5/5, unit: "/5", icon: Cpu, color: "text-orange-500" },
    { label: "Flexibility", value: 0, unit: "/5", icon: Database, color: "text-purple-500" },
  ])

  useEffect(() => {
    const targetValues = [5, 4, 4, 5]

    const animateMetrics = () => {
      targetValues.forEach((target, index) => {
        let current = 0
        const increment = target / 100

        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            current = target
            clearInterval(timer)
          }

          setMetrics((prev) => prev.map((metric, i) => (i === index ? { ...metric, value: current } : metric)))
        }, 20)
      })
    }

    const timer = setTimeout(animateMetrics, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <Card>
            <CardContent className="p-4 text-center">
              <metric.icon className={`h-6 w-6 mx-auto mb-2 ${metric.color}`} />
              <div className="text-2xl font-bold">
                {metric.value.toFixed(metric.unit === "%" ? 1 : 0)}
                <span className="text-sm text-muted-foreground ml-1">{metric.unit}</span>
              </div>
              <div className="text-xs text-muted-foreground">{metric.label}</div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
