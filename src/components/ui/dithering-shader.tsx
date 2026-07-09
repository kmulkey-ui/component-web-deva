"use client"

import { Dithering } from "@paper-design/shaders-react"
import type { DitheringShape, DitheringType } from "@paper-design/shaders"
import { type ReactNode } from "react"

interface DitheringShaderProps {
  shape?: DitheringShape
  type?: DitheringType
  colorBack?: string
  colorFront?: string
  /** pixel size of dithering grid */
  pxSize?: number
  speed?: number
  className?: string
  children?: ReactNode
}

export function DitheringShader({
  shape = "wave",
  type = "8x8",
  colorBack = "#001122",
  colorFront = "#ff0088",
  pxSize = 3,
  speed = 0.6,
  className,
  children,
}: DitheringShaderProps) {
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      {/* Full-bleed animated shader background */}
      <div className="absolute inset-0 w-full h-full">
        <Dithering
          shape={shape}
          type={type}
          colorBack={colorBack}
          colorFront={colorFront}
          size={pxSize}
          speed={speed}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      {/* Content on top */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
