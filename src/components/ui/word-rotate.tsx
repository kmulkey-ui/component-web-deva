"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface WordRotateProps {
  words: string[]
  duration?: number
  framerProps?: HTMLMotionProps<"span">
  className?: string
}

export function WordRotate({
  words,
  duration = 2500,
  framerProps = {
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 40 },
    transition: { duration: 0.3, ease: "easeOut" },
  },
  className,
}: WordRotateProps) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % words.length), duration)
    return () => clearInterval(interval)
  }, [words, duration])

  return (
    <span className="inline-flex overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span key={words[index]} className={cn(className)} {...framerProps}>
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
