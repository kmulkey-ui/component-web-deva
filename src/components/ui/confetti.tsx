"use client"

import React, { useCallback } from "react"
import confetti from "canvas-confetti"

interface ConfettiButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
}

export function ConfettiButton({ children, onClick, ...props }: ConfettiButtonProps) {
  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    confetti({
      particleCount: 120,
      spread: 80,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      colors: ["#C501E1", "#9A26F8", "#6564FE", "#2B97FA", "#FF6A63", "#F82D98", "#2EF9A0", "#E7C501"],
      ticks: 200,
    })
    onClick?.(e)
  }, [onClick])

  return <button onClick={handleClick} {...props}>{children}</button>
}
