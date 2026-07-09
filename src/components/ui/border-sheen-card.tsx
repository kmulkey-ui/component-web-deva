"use client"

import React from "react"
import { cn } from "@/lib/utils"

/**
 * BorderSheenCard
 * A white-background card with a rotating light-reflection (sheen) border.
 * The border looks like a highlight sweeping around the card edge.
 *
 * variant="pink"  → sheen uses deep-pink tones
 * variant="blue"  → sheen uses baby-blue tones
 * variant="mixed" → sheen blends pink + blue (default)
 */

type SheenVariant = "pink" | "blue" | "mixed"

interface BorderSheenCardProps {
  children: React.ReactNode
  className?: string
  innerClassName?: string
  variant?: SheenVariant
  /** border thickness in px (default 2) */
  borderWidth?: number
  /** border-radius tailwind class, e.g. "rounded-2xl" (default "rounded-2xl") */
  rounded?: string
}

const SHEEN_COLORS: Record<SheenVariant, string> = {
  pink: "conic-gradient(from var(--sheen-angle), #fce4ec 0%, #f48fb1 15%, #e91e8c 30%, #fff 45%, #e91e8c 60%, #f48fb1 75%, #fce4ec 100%)",
  blue: "conic-gradient(from var(--sheen-angle), #e3f2fd 0%, #90caf9 15%, #89cff0 30%, #fff 45%, #89cff0 60%, #90caf9 75%, #e3f2fd 100%)",
  mixed: "conic-gradient(from var(--sheen-angle), #fce4ec 0%, #f48fb1 12%, #e91e8c 22%, #c3e8fb 35%, #89cff0 45%, #fff 55%, #89cff0 65%, #e91e8c 78%, #f48fb1 88%, #fce4ec 100%)",
}

export function BorderSheenCard({
  children,
  className,
  innerClassName,
  variant = "mixed",
  borderWidth = 2,
  rounded = "rounded-2xl",
}: BorderSheenCardProps) {
  return (
    <div
      className={cn(
        "border-sheen-card relative",
        rounded,
        "p-[--bw]",
        className
      )}
      style={{
        "--bw": `${borderWidth}px`,
        "--sheen-angle": "0deg",
        background: SHEEN_COLORS[variant],
        animation: "sheen-rotate 4s linear infinite",
      } as React.CSSProperties}
    >
      <div
        className={cn(
          "relative z-10 w-full h-full bg-white",
          rounded,
          innerClassName
        )}
      >
        {children}
      </div>

      <style>{`
        @property --sheen-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes sheen-rotate {
          to { --sheen-angle: 360deg; }
        }
        /* Subtle glow behind card */
        .border-sheen-card::before {
          content: "";
          position: absolute;
          inset: -4px;
          border-radius: inherit;
          background: inherit;
          filter: blur(8px);
          opacity: 0.25;
          z-index: 0;
          animation: sheen-rotate 4s linear infinite;
        }
      `}</style>
    </div>
  )
}
