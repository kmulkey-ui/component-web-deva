"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface InteractiveDotsProps {
  colors?: string[]
  spacing?: number
  dotRadius?: number
  repelForce?: number
  repelDistance?: number
  returnSpeed?: number
  /** Pixels from home position beyond which a dot is considered "cleared" and won't return */
  clearThreshold?: number
  className?: string
  style?: React.CSSProperties
}

export function InteractiveDots({
  colors = [
    "#C501E1", "#9A26F8", "#6564FE", "#2B97FA", "#02C4E7",
    "#16E6CC", "#2EF9A0", "#C6E501", "#E7C501", "#FF6A63",
    "#F82D98", "#E830CE",
  ],
  spacing = 40,
  dotRadius = 12,
  repelForce = 0.6,
  repelDistance = 10000,
  returnSpeed = 1,
  clearThreshold = 28,   // once pushed this far, dot stays gone
  className = "",
  style = {},
}: InteractiveDotsProps) {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const dotsRef      = useRef<Dot[]>([])
  const mouseRef     = useRef({ x: -9999, y: -9999 })

  class Dot {
    x: number; y: number
    dx: number; dy: number       // home position
    color: string; radius: number
    cleared: boolean             // true = never return

    constructor(x: number, y: number, color: string) {
      this.x = x;  this.y = y
      this.dx = x; this.dy = y
      this.color   = color
      this.radius  = dotRadius
      this.cleared = false
    }

    update(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
      const mouse = mouseRef.current
      const disX = this.x - mouse.x
      const disY = this.y - mouse.y
      const ds   = disX * disX + disY * disY

      if (ds < repelDistance) {
        // Being pushed by cursor
        const angle = Math.atan2(disY, disX)
        const dist  = repelDistance / ds
        this.x += Math.cos(angle) * dist * repelForce
        this.y += Math.sin(angle) * dist * repelForce

        // Mark as cleared once it has travelled far enough from home
        if (!this.cleared) {
          const fromHome = Math.hypot(this.x - this.dx, this.y - this.dy)
          if (fromHome >= clearThreshold) this.cleared = true
        }
      } else if (!this.cleared) {
        // Only drift back if the dot was never truly cleared
        const fromHome = Math.hypot(this.x - this.dx, this.y - this.dy)
        if (fromHome > 0.5) {
          this.x += (this.dx - this.x) * 0.02 * returnSpeed
          this.y += (this.dy - this.y) * 0.02 * returnSpeed
        }
      }
      // cleared dots stay exactly where the cursor left them — no return

      // Soft boundary: if a cleared dot goes completely off-screen, hide it there
      // (don't snap back to home)

      this.draw(ctx)
    }

    draw(ctx: CanvasRenderingContext2D) {
      // Don't draw dots that are fully off-canvas
      if (
        this.x < -this.radius || this.x > ctx.canvas.width  + this.radius ||
        this.y < -this.radius || this.y > ctx.canvas.height + this.radius
      ) return

      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
      ctx.fillStyle = this.color
      ctx.fill()
      ctx.closePath()
    }
  }

  const randomColor = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

  const initDots = (canvas: HTMLCanvasElement) => {
    const dots: Dot[] = []
    for (let x = spacing / 2; x < canvas.width;  x += spacing)
      for (let y = spacing / 2; y < canvas.height; y += spacing)
        dots.push(new Dot(x, y, randomColor(colors)))
    dotsRef.current = dots
  }

  const animate = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    dotsRef.current.forEach((dot) => dot.update(canvas, ctx))
    animationRef.current = requestAnimationFrame(() => animate(canvas, ctx))
  }

  const handleMouseMove = (event: MouseEvent | TouchEvent) => {
    if (event instanceof MouseEvent) {
      mouseRef.current.x = event.clientX
      mouseRef.current.y = event.clientY
    } else if (event instanceof TouchEvent && event.touches.length > 0) {
      mouseRef.current.x = event.touches[0].clientX
      mouseRef.current.y = event.touches[0].clientY
    }
  }

  const handleResize = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
    initDots(canvas)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
    initDots(canvas)
    animate(canvas, ctx)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove",  handleMouseMove)
    window.addEventListener("resize",     handleResize)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove",  handleMouseMove)
      window.removeEventListener("resize",     handleResize)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colors, spacing, dotRadius, repelForce, repelDistance, returnSpeed, clearThreshold])

  const defaultStyle: React.CSSProperties = {
    position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1,
    ...style,
  }

  return <canvas ref={canvasRef} className={className} style={defaultStyle} />
}
