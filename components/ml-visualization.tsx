"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, BarChart3, Activity, Zap } from "lucide-react"
import { motion } from "framer-motion"

// Simulated data for ML model performance
const modelData = {
  "Parkinson's Detection": {
    accuracy: 93,
    precision: 91,
    recall: 95,
    f1Score: 93,
    dataset: "195 entries",
    technique: "Bi-LSTM",
  },
  "Speech Emotion Recognition": {
    accuracy: 87,
    precision: 85,
    recall: 89,
    f1Score: 87,
    dataset: "RAVDESS + CREMA-D",
    technique: "CNN + Transformer",
  },
  "Health Risk Prediction": {
    accuracy: 82,
    precision: 80,
    recall: 84,
    f1Score: 82,
    dataset: "Google Fit Data",
    technique: "Random Forest",
  },
}

export function MLVisualization() {
  const [selectedModel, setSelectedModel] = useState("Parkinson's Detection")
  const [animatedMetrics, setAnimatedMetrics] = useState({
    accuracy: 0,
    precision: 0,
    recall: 0,
    f1Score: 0,
  })

  useEffect(() => {
    const model = modelData[selectedModel as keyof typeof modelData]

    // Animate metrics
    const animateMetric = (target: number, key: string) => {
      let current = 0
      const increment = target / 50
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        setAnimatedMetrics((prev) => ({ ...prev, [key]: Math.floor(current) }))
      }, 20)
    }

    setTimeout(() => {
      animateMetric(model.accuracy, "accuracy")
      animateMetric(model.precision, "precision")
      animateMetric(model.recall, "recall")
      animateMetric(model.f1Score, "f1Score")
    }, 300)
  }, [selectedModel])

  const currentModel = modelData[selectedModel as keyof typeof modelData]

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-primary" />
          <span>ML Model Performance Visualization</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Model Selector */}
        <div className="flex flex-wrap gap-2">
          {Object.keys(modelData).map((model) => (
            <Button
              key={model}
              variant={selectedModel === model ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedModel(model)}
              className="text-xs"
            >
              {model}
            </Button>
          ))}
        </div>

        {/* Model Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Technique:</span>
              <Badge variant="secondary">{currentModel.technique}</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Dataset:</span>
              <span className="text-sm text-muted-foreground">{currentModel.dataset}</span>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { key: "accuracy", label: "Accuracy", color: "text-green-500", bgColor: "bg-green-500" },
            { key: "precision", label: "Precision", color: "text-blue-500", bgColor: "bg-blue-500" },
            { key: "recall", label: "Recall", color: "text-purple-500", bgColor: "bg-purple-500" },
            { key: "f1Score", label: "F1-Score", color: "text-orange-500", bgColor: "bg-orange-500" },
          ].map((metric, index) => (
            <motion.div
              key={metric.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-4 bg-muted/50 rounded-lg"
            >
              <div className="relative w-16 h-16 mx-auto mb-2">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-muted stroke-current"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <motion.path
                    className={`${metric.color} stroke-current`}
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    initial={{ strokeDasharray: "0 100" }}
                    animate={{
                      strokeDasharray: `${animatedMetrics[metric.key as keyof typeof animatedMetrics]} 100`,
                    }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold">
                    {animatedMetrics[metric.key as keyof typeof animatedMetrics]}%
                  </span>
                </div>
              </div>
              <div className="text-sm font-medium">{metric.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Performance Chart Simulation */}
        <div className="mt-6">
          <h4 className="text-sm font-medium mb-3 flex items-center">
            <Activity className="h-4 w-4 mr-2" />
            Training Progress Simulation
          </h4>
          <div className="h-32 bg-muted/30 rounded-lg p-4 flex items-end space-x-1">
            {Array.from({ length: 20 }, (_, i) => {
              const height = Math.random() * 80 + 20
              return (
                <motion.div
                  key={i}
                  className="bg-primary/60 rounded-t"
                  style={{ width: "4%" }}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                />
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
