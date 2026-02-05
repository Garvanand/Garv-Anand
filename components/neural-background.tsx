"use client"

import { useEffect, useRef, useCallback } from "react"
import { useTheme } from "next-themes"

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  pulsePhase: number
  layer: number
}

interface Connection {
  from: number
  to: number
  strength: number
  dataFlow: number
}

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const nodesRef = useRef<Node[]>([])
  const connectionsRef = useRef<Connection[]>([])
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const { resolvedTheme } = useTheme()

  const initializeNetwork = useCallback((width: number, height: number) => {
    const nodeCount = Math.min(Math.floor((width * height) / 25000), 80)
    const nodes: Node[] = []
    const connections: Connection[] = []

    // Create nodes in layers (like a neural network)
    for (let i = 0; i < nodeCount; i++) {
      const layer = Math.floor(i / (nodeCount / 4))
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 2 + Math.random() * 2,
        pulsePhase: Math.random() * Math.PI * 2,
        layer,
      })
    }

    // Create connections based on proximity and layer
    const maxDistance = Math.min(width, height) * 0.2
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance) {
          const strength = 1 - distance / maxDistance
          connections.push({
            from: i,
            to: j,
            strength,
            dataFlow: Math.random(),
          })
        }
      }
    }

    nodesRef.current = nodes
    connectionsRef.current = connections
  }, [])

  const animate = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
      const isDark = resolvedTheme === "dark"

      // Clear with slight trail effect
      ctx.fillStyle = isDark ? "rgba(8, 12, 21, 0.15)" : "rgba(255, 255, 255, 0.15)"
      ctx.fillRect(0, 0, width, height)

      const nodes = nodesRef.current
      const connections = connectionsRef.current
      const mouse = mouseRef.current

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Mouse interaction
        if (mouse.active) {
          const dx = mouse.x - node.x
          const dy = mouse.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDist = 200

          if (distance < maxDist) {
            const force = (1 - distance / maxDist) * 0.5
            node.vx += (dx / distance) * force
            node.vy += (dy / distance) * force
          }
        }

        // Update position
        node.x += node.vx
        node.y += node.vy

        // Damping
        node.vx *= 0.99
        node.vy *= 0.99

        // Boundary bounce
        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1

        // Keep in bounds
        node.x = Math.max(0, Math.min(width, node.x))
        node.y = Math.max(0, Math.min(height, node.y))

        // Update pulse
        node.pulsePhase += 0.02

        // Draw node with pulse effect
        const pulseScale = 1 + Math.sin(node.pulsePhase) * 0.3
        const radius = node.radius * pulseScale

        // Glow effect
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 4)

        if (isDark) {
          const hue = 217 + node.layer * 20
          gradient.addColorStop(0, `hsla(${hue}, 91%, 60%, 0.8)`)
          gradient.addColorStop(0.5, `hsla(${hue}, 91%, 60%, 0.2)`)
          gradient.addColorStop(1, `hsla(${hue}, 91%, 60%, 0)`)
        } else {
          const hue = 217 + node.layer * 20
          gradient.addColorStop(0, `hsla(${hue}, 91%, 50%, 0.6)`)
          gradient.addColorStop(0.5, `hsla(${hue}, 91%, 50%, 0.15)`)
          gradient.addColorStop(1, `hsla(${hue}, 91%, 50%, 0)`)
        }

        ctx.beginPath()
        ctx.arc(node.x, node.y, radius * 4, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = isDark ? `hsla(217, 91%, 70%, 0.9)` : `hsla(217, 91%, 50%, 0.7)`
        ctx.fill()
      })

      // Draw connections with data flow animation
      connections.forEach((conn) => {
        const fromNode = nodes[conn.from]
        const toNode = nodes[conn.to]

        if (!fromNode || !toNode) return

        const dx = toNode.x - fromNode.x
        const dy = toNode.y - fromNode.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Update connection strength based on current distance
        const maxDistance = Math.min(width, height) * 0.15
        const currentStrength = Math.max(0, 1 - distance / maxDistance)

        if (currentStrength > 0.1) {
          // Animate data flow
          conn.dataFlow = (conn.dataFlow + 0.005) % 1

          // Draw connection line
          ctx.beginPath()
          ctx.moveTo(fromNode.x, fromNode.y)
          ctx.lineTo(toNode.x, toNode.y)

          const alpha = currentStrength * 0.4
          ctx.strokeStyle = isDark ? `hsla(217, 91%, 60%, ${alpha})` : `hsla(217, 91%, 50%, ${alpha})`
          ctx.lineWidth = currentStrength * 1.5
          ctx.stroke()

          // Draw data packet flowing along connection
          const packetX = fromNode.x + dx * conn.dataFlow
          const packetY = fromNode.y + dy * conn.dataFlow

          ctx.beginPath()
          ctx.arc(packetX, packetY, 2 * currentStrength, 0, Math.PI * 2)
          ctx.fillStyle = isDark ? `hsla(172, 66%, 50%, ${currentStrength})` : `hsla(172, 66%, 40%, ${currentStrength})`
          ctx.fill()
        }
      })

      // Draw mouse interaction area
      if (mouse.active) {
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 150)
        gradient.addColorStop(0, isDark ? "hsla(280, 100%, 70%, 0.1)" : "hsla(280, 100%, 60%, 0.08)")
        gradient.addColorStop(1, "transparent")
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 150, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }
    },
    [resolvedTheme]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      initializeNetwork(rect.width, rect.height)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    resize()
    window.addEventListener("resize", resize)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    let startTime = performance.now()
    const loop = (currentTime: number) => {
      const rect = canvas.getBoundingClientRect()
      animate(ctx, rect.width, rect.height, currentTime - startTime)
      animationRef.current = requestAnimationFrame(loop)
    }

    animationRef.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate, initializeNetwork])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-auto -z-10"
      style={{ background: "transparent" }}
    />
  )
}
