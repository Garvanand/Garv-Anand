"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, Zap, TrendingUp, Activity } from "lucide-react"

interface PredictionResult {
  confidence: number
  prediction: string
  accuracy: number
}

export function InteractiveMLDemo() {
  const [isTraining, setIsTraining] = useState(false)
  const [modelParams, setModelParams] = useState({
    learningRate: [0.01],
    epochs: [100],
    batchSize: [32],
  })
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [trainingProgress, setTrainingProgress] = useState(0)

  const simulateTraining = async () => {
    setIsTraining(true)
    setTrainingProgress(0)

    // Simulate training progress
    for (let i = 0; i <= 100; i += 5) {
      await new Promise((resolve) => setTimeout(resolve, 100))
      setTrainingProgress(i)
    }

    // Generate mock prediction
    const mockPrediction: PredictionResult = {
      confidence: 85 + Math.random() * 10,
      prediction: "Positive Sentiment",
      accuracy: 92 + Math.random() * 6,
    }

    setPrediction(mockPrediction)
    setIsTraining(false)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-primary" />
          <span>Interactive ML Model Demo</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Model Parameters */}
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center space-x-2">
            <Zap className="h-4 w-4" />
            <span>Model Hyperparameters</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Learning Rate</label>
              <Slider
                value={modelParams.learningRate}
                onValueChange={(value) => setModelParams((prev) => ({ ...prev, learningRate: value }))}
                max={0.1}
                min={0.001}
                step={0.001}
                className="w-full"
              />
              <span className="text-xs text-muted-foreground">{modelParams.learningRate[0].toFixed(3)}</span>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Epochs</label>
              <Slider
                value={modelParams.epochs}
                onValueChange={(value) => setModelParams((prev) => ({ ...prev, epochs: value }))}
                max={500}
                min={50}
                step={10}
                className="w-full"
              />
              <span className="text-xs text-muted-foreground">{modelParams.epochs[0]}</span>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Batch Size</label>
              <Slider
                value={modelParams.batchSize}
                onValueChange={(value) => setModelParams((prev) => ({ ...prev, batchSize: value }))}
                max={128}
                min={16}
                step={16}
                className="w-full"
              />
              <span className="text-xs text-muted-foreground">{modelParams.batchSize[0]}</span>
            </div>
          </div>
        </div>

        {/* Training Section */}
        <div className="space-y-4">
          <Button onClick={simulateTraining} disabled={isTraining} className="w-full">
            {isTraining ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="mr-2"
              >
                <Activity className="h-4 w-4" />
              </motion.div>
            ) : (
              <TrendingUp className="mr-2 h-4 w-4" />
            )}
            {isTraining ? "Training Model..." : "Train Model"}
          </Button>

          <AnimatePresence>
            {isTraining && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <div className="flex justify-between text-sm">
                  <span>Training Progress</span>
                  <span>{trainingProgress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div
                    className="bg-primary h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${trainingProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results */}
        <AnimatePresence>
          {prediction && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 bg-muted/50 rounded-lg space-y-3"
            >
              <h4 className="font-semibold">Model Prediction Results</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{prediction.confidence.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Confidence</div>
                </div>
                <div className="text-center">
                  <Badge variant="secondary" className="text-sm">
                    {prediction.prediction}
                  </Badge>
                  <div className="text-xs text-muted-foreground mt-1">Prediction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">{prediction.accuracy.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Accuracy</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
