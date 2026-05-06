"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface Node {
  x: number
  y: number
  id: string
}

interface Connection {
  from: Node
  to: Node
  weight: number
}

export function AINetworkVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create neural network nodes
    const layers = [4, 6, 6, 3]
    const nodes: Node[][] = []
    const connections: Connection[] = []

    layers.forEach((layerSize, layerIndex) => {
      nodes[layerIndex] = []
      for (let i = 0; i < layerSize; i++) {
        nodes[layerIndex].push({
          x: (layerIndex + 1) * (canvas.offsetWidth / (layers.length + 1)),
          y: (i + 1) * (canvas.offsetHeight / (layerSize + 1)),
          id: `${layerIndex}-${i}`,
        })
      }
    })

    // Create connections
    for (let layer = 0; layer < layers.length - 1; layer++) {
      nodes[layer].forEach((fromNode) => {
        nodes[layer + 1].forEach((toNode) => {
          connections.push({
            from: fromNode,
            to: toNode,
            weight: Math.random(),
          })
        })
      })
    }

    let animationFrame: number
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      time += 0.02

      // Draw connections
      connections.forEach((connection) => {
        const opacity = 0.1 + 0.3 * Math.sin(time + connection.weight * 10)
        ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`
        ctx.lineWidth = 1 + connection.weight
        ctx.beginPath()
        ctx.moveTo(connection.from.x, connection.from.y)
        ctx.lineTo(connection.to.x, connection.to.y)
        ctx.stroke()
      })

      // Draw nodes
      nodes.flat().forEach((node, index) => {
        const pulse = 0.5 + 0.5 * Math.sin(time * 2 + index * 0.5)
        ctx.fillStyle = `rgba(16, 185, 129, ${pulse})`
        ctx.beginPath()
        ctx.arc(node.x, node.y, 4 + pulse * 2, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" style={{ width: "100%", height: "100%" }} />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center"
        >
          <h3 className="text-lg font-semibold text-foreground/80">Neural Network</h3>
          <p className="text-sm text-muted-foreground">My way of Visualization</p>
        </motion.div>
      </div>
    </div>
  )
}
