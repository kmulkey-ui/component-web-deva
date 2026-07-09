"use client"

import { Warp } from "@paper-design/shaders-react"

interface WarpShaderProps {
  className?: string
  colors?: string[]
}

export function WarpShader({
  className = "",
  colors = ["hsl(280,80%,15%)", "hsl(310,90%,60%)", "hsl(200,80%,40%)", "hsl(170,100%,75%)"],
}: WarpShaderProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Warp
        style={{ height: "100%", width: "100%" }}
        proportion={0.45}
        softness={1}
        distortion={0.25}
        swirl={0.8}
        swirlIterations={10}
        shape="checks"
        shapeScale={0.1}
        scale={1}
        rotation={0}
        speed={1}
        colors={colors}
      />
    </div>
  )
}
