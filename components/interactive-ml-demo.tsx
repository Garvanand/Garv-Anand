"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, Zap, TrendingUp, Activity, Target } from "lucide-react"

interface MissionResult {
  accuracy: number
  latency: number
  energy: number
  status: "success" | "in-progress"
}

interface SentimentResult {
  label: "Positive" | "Negative" | "Neutral"
  score: number
  confidence: number
  highlights: string[]
}

const positiveLexicon = [
  "innovative",
  "efficient",
  "robust",
  "accurate",
  "fast",
  "scalable",
  "intelligent",
  "reliable",
  "optimized",
  "breakthrough",
]

const negativeLexicon = [
  "slow",
  "buggy",
  "unstable",
  "inaccurate",
  "noisy",
  "fragile",
  "latency",
  "error",
  "overfit",
  "crash",
]

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export function InteractiveMLDemo() {
  const [modelParams, setModelParams] = useState({
    learningRate: [0.01],
    epochs: [120],
    batchSize: [32],
  })
  const [missionResult, setMissionResult] = useState<MissionResult | null>(null)
  const [sentimentInput, setSentimentInput] = useState("")
  const [sentimentResult, setSentimentResult] = useState<SentimentResult | null>(null)
  const [xp, setXp] = useState(20)
  const [badges, setBadges] = useState<string[]>(["Explorer"])

  const missionTarget = {
    accuracy: 90,
    latency: 60,
  }

  const estimatedStats = useMemo(() => {
    const learningRate = modelParams.learningRate[0]
    const epochs = modelParams.epochs[0]
    const batchSize = modelParams.batchSize[0]

    const accuracy = clamp(70 + epochs / 8 + batchSize / 6 - learningRate * 1200, 60, 98)
    const latency = clamp(160 - batchSize * 0.8 - epochs * 0.1 + learningRate * 400, 40, 200)
    const energy = clamp(45 + epochs * 0.22 + batchSize * 0.15, 30, 160)

    return { accuracy, latency, energy }
  }, [modelParams])

  const addBadge = (badge: string) => {
    setBadges((prev) => (prev.includes(badge) ? prev : [...prev, badge]))
  }

  const evaluateMission = () => {
    const status =
      estimatedStats.accuracy >= missionTarget.accuracy && estimatedStats.latency <= missionTarget.latency
        ? "success"
        : "in-progress"

    setMissionResult({ ...estimatedStats, status })
    setXp((prev) => clamp(prev + (status === "success" ? 20 : 8), 0, 100))

    if (status === "success") {
      addBadge("Optimizer")
    }
  }

  const analyzeSentiment = () => {
    const tokens = sentimentInput.toLowerCase().match(/[a-z']+/g) ?? []
    let score = 0
    const highlights: string[] = []

    tokens.forEach((token) => {
      if (positiveLexicon.includes(token)) {
        score += 1
        highlights.push(token)
      }
      if (negativeLexicon.includes(token)) {
        score -= 1
        highlights.push(token)
      }
    })

    const label = score > 0 ? "Positive" : score < 0 ? "Negative" : "Neutral"
    const confidence = clamp(50 + Math.abs(score) * 10, 50, 95)

    setSentimentResult({ label, score, confidence, highlights: highlights.slice(0, 5) })
    setXp((prev) => clamp(prev + 6, 0, 100))

    if (Math.abs(score) >= 3) {
      addBadge("Signal Finder")
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-primary" />
          <span>AI Mission Control</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span>Hyperparameter Challenge</span>
              </h4>
              <p className="text-sm text-muted-foreground">
                Tune the sliders to reach the mission target: ≥{missionTarget.accuracy}% accuracy and ≤{missionTarget.latency}
                ms latency.
              </p>

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
                    max={240}
                    min={60}
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

              <Button onClick={evaluateMission} className="w-full">
                <TrendingUp className="mr-2 h-4 w-4" />
                Evaluate Mission
              </Button>

              <AnimatePresence>
                {missionResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-4 bg-muted/50 rounded-lg space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Mission Readout</h4>
                      <Badge variant={missionResult.status === "success" ? "default" : "secondary"}>
                        {missionResult.status === "success" ? "Mission Ready" : "Keep Tuning"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{missionResult.accuracy.toFixed(1)}%</div>
                        <div className="text-xs text-muted-foreground">Estimated Accuracy</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-secondary">{missionResult.latency.toFixed(0)}ms</div>
                        <div className="text-xs text-muted-foreground">Estimated Latency</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{missionResult.energy.toFixed(0)}kJ</div>
                        <div className="text-xs text-muted-foreground">Energy Footprint</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold flex items-center space-x-2">
                <Activity className="h-4 w-4" />
                <span>Live Sentiment Probe</span>
              </h4>
              <p className="text-sm text-muted-foreground">
                Paste a sentence and see the rule-based sentiment analysis in real time (lexicon scoring + confidence).
              </p>
              <Textarea
                value={sentimentInput}
                onChange={(event) => setSentimentInput(event.target.value)}
                placeholder="Example: The vision model is accurate and fast, but the latency feels noisy."
                className="min-h-[120px]"
              />
              <Button onClick={analyzeSentiment} disabled={!sentimentInput.trim()} className="w-full" variant="outline">
                <Activity className="mr-2 h-4 w-4" />
                Run Inference
              </Button>

              <AnimatePresence>
                {sentimentResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-4 bg-muted/50 rounded-lg space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Inference Output</h4>
                      <Badge variant={sentimentResult.label === "Positive" ? "default" : "secondary"}>
                        {sentimentResult.label}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{sentimentResult.score}</div>
                        <div className="text-xs text-muted-foreground">Sentiment Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-secondary">{sentimentResult.confidence}%</div>
                        <div className="text-xs text-muted-foreground">Confidence</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{sentimentResult.highlights.length}</div>
                        <div className="text-xs text-muted-foreground">Matched Tokens</div>
                      </div>
                    </div>
                    {sentimentResult.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {sentimentResult.highlights.map((word) => (
                          <Badge key={word} variant="outline" className="text-xs">
                            {word}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-4 rounded-lg border bg-background/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Explorer XP</span>
                <span className="text-sm text-muted-foreground">{xp}/100</span>
              </div>
              <Progress value={xp} />
              <p className="text-xs text-muted-foreground">
                Complete missions and run inferences to unlock new badges.
              </p>
            </div>

            <div className="p-4 rounded-lg border bg-background/80 space-y-3">
              <div className="flex items-center space-x-2 font-semibold">
                <Zap className="h-4 w-4 text-primary" />
                <span>Unlocked Badges</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {badges.map((badge) => (
                  <Badge key={badge} variant="secondary" className="text-xs">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-lg border bg-muted/50 space-y-2 text-sm">
              <div className="font-semibold">Mission Tips</div>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Higher epochs boost accuracy but add latency.</li>
                <li>• Smaller learning rates stabilize performance.</li>
                <li>• Larger batch sizes reduce latency variance.</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
