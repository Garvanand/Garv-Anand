"use client"

import { motion } from "framer-motion"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  text?: string
}

export function LoadingSpinner({ size = "md", text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <motion.div
          className={`${sizeClasses[size]} border-4 border-primary/20 rounded-full`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className={`absolute inset-0 ${sizeClasses[size]} border-4 border-transparent border-t-primary rounded-full`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 bg-primary/10 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>
      {text && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-muted-foreground">
          {text}
        </motion.p>
      )}
    </div>
  )
}

export function AILoadingAnimation() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <motion.div
        className="w-3 h-3 bg-primary rounded-full"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
      />
      <motion.div
        className="w-3 h-3 bg-secondary rounded-full"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
      />
      <motion.div
        className="w-3 h-3 bg-primary rounded-full"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
      />
      <span className="ml-3 text-sm text-muted-foreground">Processing AI models...</span>
    </div>
  )
}
