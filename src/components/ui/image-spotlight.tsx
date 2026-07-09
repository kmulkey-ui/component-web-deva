"use client"

import React, { useState, useCallback, useRef } from "react"

interface PerspectiveState {
  rotateX: number
  rotateY: number
}

interface SpotlightConfig {
  spotlightSize?: number
  overlayOpacity?: number
  className?: string
}

interface ImageSpotlightProps {
  src: string
  alt: string
  orientation?: "landscape" | "portrait"
  width?: number
  height?: number
  config?: SpotlightConfig
}

export default function ImageSpotlight({
  src,
  alt,
  orientation = "landscape",
  width,
  height,
  config = {},
}: ImageSpotlightProps) {
  const defaultConfig = { spotlightSize: 80, overlayOpacity: 0.6, className: "" }
  const fc = { ...defaultConfig, ...config }

  const [perspective, setPerspective] = useState<PerspectiveState>({ rotateX: 0, rotateY: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left)  / rect.width)  * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    containerRef.current.style.setProperty("--mouse-x", `${x}%`)
    containerRef.current.style.setProperty("--mouse-y", `${y}%`)
    setPerspective({
      rotateY: ((x - 50) / 50) * 8,
      rotateX: ((50 - y) / 50) * 8,
    })
  }, [])

  const getDims = (): React.CSSProperties => {
    if (width && height) return { width: `${width}px`, height: `${height}px`, maxWidth: "100%" }
    return orientation === "landscape"
      ? { width: "100%", height: "320px", maxWidth: "100%" }
      : { width: "100%", height: "420px", maxWidth: "100%" }
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div
        ref={containerRef}
        className={`relative overflow-hidden cursor-none rounded-2xl shadow-lg border border-gray-100 ${fc.className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setPerspective({ rotateX: 0, rotateY: 0 })}
        style={{
          ...getDims(),
          "--mouse-x": "50%",
          "--mouse-y": "50%",
          transform: `perspective(1000px) rotateX(${perspective.rotateX}deg) rotateY(${perspective.rotateY}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.2s ease-out",
        } as React.CSSProperties}
      >
        {/* Blurred base */}
        <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" draggable={false} style={{ filter: "blur(5px)" }} />

        {/* Sharp through spotlight */}
        <img
          src={src} alt="" className="absolute inset-0 w-full h-full object-cover" draggable={false}
          style={{
            maskImage: `radial-gradient(circle at var(--mouse-x,50%) var(--mouse-y,50%), black ${fc.spotlightSize * 0.4}px, transparent ${fc.spotlightSize * 1.6}px)`,
            WebkitMaskImage: `radial-gradient(circle at var(--mouse-x,50%) var(--mouse-y,50%), black ${fc.spotlightSize * 0.4}px, transparent ${fc.spotlightSize * 1.6}px)`,
            zIndex: 2,
          }}
        />

        {/* Dark overlay */}
        <div
          className="absolute inset-0 bg-black"
          style={{
            opacity: fc.overlayOpacity,
            maskImage: `radial-gradient(circle at var(--mouse-x,50%) var(--mouse-y,50%), transparent ${fc.spotlightSize * 0.4}px, black ${fc.spotlightSize * 1.6}px)`,
            WebkitMaskImage: `radial-gradient(circle at var(--mouse-x,50%) var(--mouse-y,50%), transparent ${fc.spotlightSize * 0.4}px, black ${fc.spotlightSize * 1.6}px)`,
            zIndex: 10,
          }}
        />
      </div>
    </div>
  )
}
