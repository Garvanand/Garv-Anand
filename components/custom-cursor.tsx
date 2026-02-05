"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isHidden, setIsHidden] = useState(true)
  const [isClicking, setIsClicking] = useState(false)

  const updatePosition = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY })
    setIsHidden(false)

    const target = e.target as HTMLElement
    const isClickable =
      target.tagName === "A" ||
      target.tagName === "BUTTON" ||
      target.closest("a") ||
      target.closest("button") ||
      target.closest("[role='button']") ||
      window.getComputedStyle(target).cursor === "pointer"

    setIsPointer(!!isClickable)
  }, [])

  useEffect(() => {
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsHidden(true)
    const handleMouseEnter = () => setIsHidden(false)

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [updatePosition])

  // Don't render on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null
  }

  return (
    <AnimatePresence>
      {!isHidden && (
        <>
          {/* Main cursor */}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
            animate={{
              x: position.x - 6,
              y: position.y - 6,
              scale: isClicking ? 0.8 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 28,
              mass: 0.5,
            }}
          >
            <div className="w-3 h-3 rounded-full bg-white" />
          </motion.div>

          {/* Cursor ring */}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9998]"
            animate={{
              x: position.x - 20,
              y: position.y - 20,
              scale: isPointer ? 1.5 : 1,
              opacity: isPointer ? 0.5 : 0.3,
            }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 15,
              mass: 0.1,
            }}
          >
            <div
              className={`w-10 h-10 rounded-full border-2 ${
                isPointer ? "border-primary" : "border-foreground/50"
              } transition-colors duration-200`}
            />
          </motion.div>

          {/* Glow effect on pointer */}
          <AnimatePresence>
            {isPointer && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="fixed top-0 left-0 pointer-events-none z-[9997]"
                style={{
                  x: position.x - 30,
                  y: position.y - 30,
                }}
              >
                <div className="w-[60px] h-[60px] rounded-full bg-primary/20 blur-xl" />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}
