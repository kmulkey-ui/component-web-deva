"use client"

import type React from "react"

interface AnimatedBlobsProps {
  className?: string
}

export function AnimatedBlobs({ className = "" }: AnimatedBlobsProps) {
  const blobStyle = {
    "--border-radius": "115% 140% 145% 110% / 125% 140% 110% 125%",
    "--border-width": "4vmin",
    aspectRatio: "1",
    display: "block",
    gridArea: "stack",
    backgroundSize: "calc(100% + var(--border-width) * 2)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    border: "var(--border-width) solid transparent",
    borderRadius: "var(--border-radius)",
    maskImage: "linear-gradient(transparent, transparent), linear-gradient(black, white)",
    maskClip: "padding-box, border-box",
    maskComposite: "intersect",
    mixBlendMode: "screen" as const,
    height: "95vmin",
    filter: "blur(1vmin)",
  } as React.CSSProperties

  const blobs = [
    { backgroundColor: "#C501E1", backgroundImage: "linear-gradient(#C501E1, #9A26F8, #C501E1)", transform: "rotate(30deg) scale(1.03)" },
    { backgroundColor: "#FF6A63", backgroundImage: "linear-gradient(#FF6A63, #F82D98, #FF6A63)", transform: "rotate(60deg) scale(0.95)" },
    { backgroundColor: "#6564FE", backgroundImage: "linear-gradient(#6564FE, #2B97FA, #6564FE)", transform: "rotate(90deg) scale(0.97)" },
    { backgroundColor: "#16E6CC", backgroundImage: "linear-gradient(#16E6CC, #2EF9A0, #16E6CC)", transform: "rotate(120deg) scale(1.02)" },
  ]

  return (
    <div className={`absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none ${className}`}>
      <div className="grid" style={{ gridTemplateAreas: "'stack'" }}>
        <div className="grid relative blob-spinner" style={{ gridTemplateAreas: "'stack'", gridArea: "stack" }}>
          {blobs.map((blob, index) => (
            <span key={index} style={{ ...blobStyle, ...blob }} />
          ))}
        </div>
      </div>
    </div>
  )
}
