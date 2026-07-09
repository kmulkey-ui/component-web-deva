"use client"

import * as React from "react"
import { Sparkle } from "lucide-react"
import { createRoot } from "react-dom/client"
import { cn } from "@/lib/utils"

interface Point {
  x: number
  y: number
}

export interface MouseSparklesProps {
  icon?: React.ReactNode
  starAnimationDuration?: number
  minimumTimeBetweenStars?: number
  minimumDistanceBetweenStars?: number
  glowDuration?: number
  maximumGlowPointSpacing?: number
  colors?: string[]
  sizes?: string[]
  className?: string
}

export function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function selectRandom<T>(items: T[]): T {
  return items[rand(0, items.length - 1)]
}

export function calcDistance(a: Point, b: Point) {
  const dx = b.x - a.x
  const dy = b.y - a.y
  return Math.sqrt(dx * dx + dy * dy)
}

const MouseSparkles = React.forwardRef<HTMLDivElement, MouseSparklesProps>(
  (
    {
      icon: Icon = <Sparkle className="h-full w-full" />,
      starAnimationDuration = 1500,
      minimumTimeBetweenStars = 250,
      minimumDistanceBetweenStars = 75,
      glowDuration = 75,
      maximumGlowPointSpacing = 10,
      colors = ["249 146 253", "252 254 255"],
      sizes = ["1.4rem", "1rem", "0.6rem"],
      className,
    },
    _ref,
  ) => {
    const configRef = React.useRef({
      starAnimationDuration,
      minimumTimeBetweenStars,
      minimumDistanceBetweenStars,
      glowDuration,
      maximumGlowPointSpacing,
      colors,
      sizes,
      animations: ["ms-fall-1", "ms-fall-2", "ms-fall-3"],
    })

    const lastRef = React.useRef({
      starTimestamp: Date.now(),
      starPosition: { x: 0, y: 0 },
      mousePosition: { x: 0, y: 0 },
    })

    const countRef = React.useRef(0)

    const createStar = React.useCallback(
      (position: Point) => {
        const wrapper = document.createElement("div")
        const color = selectRandom(configRef.current.colors)
        const size  = selectRandom(configRef.current.sizes)

        wrapper.className = cn("mouse-sparkles-star", className)
        wrapper.style.left          = `${position.x}px`
        wrapper.style.top           = `${position.y}px`
        wrapper.style.fontSize      = size
        wrapper.style.color         = `rgb(${color})`
        wrapper.style.textShadow    = `0 0 1.5rem rgb(${color} / 0.5)`
        wrapper.style.animationName = configRef.current.animations[countRef.current++ % 3]
        wrapper.style.animationDuration = `${configRef.current.starAnimationDuration}ms`

        document.body.appendChild(wrapper)
        const root = createRoot(wrapper)
        root.render(Icon as React.ReactElement)
        setTimeout(() => {
          root.unmount()
          if (document.body.contains(wrapper)) document.body.removeChild(wrapper)
        }, configRef.current.starAnimationDuration)
      },
      [Icon, className],
    )

    const createGlowPoint = React.useCallback(
      (position: Point) => {
        const glow = document.createElement("div")
        glow.className = cn("mouse-sparkles-glow-point", className)
        glow.style.left = `${position.x}px`
        glow.style.top  = `${position.y}px`
        document.body.appendChild(glow)
        setTimeout(() => {
          if (document.body.contains(glow)) document.body.removeChild(glow)
        }, configRef.current.glowDuration)
      },
      [className],
    )

    const createGlow = React.useCallback(
      (last: Point, current: Point) => {
        const distance = calcDistance(last, current)
        const quantity = Math.max(Math.floor(distance / configRef.current.maximumGlowPointSpacing), 1)
        const dx = (current.x - last.x) / quantity
        const dy = (current.y - last.y) / quantity
        for (let i = 0; i < quantity; i++) {
          createGlowPoint({ x: last.x + dx * i, y: last.y + dy * i })
        }
      },
      [createGlowPoint],
    )

    const handleOnMove = React.useCallback(
      (e: { clientX: number; clientY: number }) => {
        const pos = { x: e.clientX, y: e.clientY }
        const lr  = lastRef.current
        if (lr.mousePosition.x === 0 && lr.mousePosition.y === 0) lr.mousePosition = pos

        const now              = Date.now()
        const farEnough        = calcDistance(lr.starPosition, pos) >= configRef.current.minimumDistanceBetweenStars
        const longEnough       = now - lr.starTimestamp > configRef.current.minimumTimeBetweenStars

        if (farEnough || longEnough) {
          createStar(pos)
          lr.starTimestamp = now
          lr.starPosition  = pos
        }

        createGlow(lr.mousePosition, pos)
        lr.mousePosition = pos
      },
      [createStar, createGlow],
    )

    React.useEffect(() => {
      const onMove  = (e: MouseEvent)       => handleOnMove(e)
      const onTouch = (e: TouchEvent)       => handleOnMove(e.touches[0])
      const onLeave = ()                    => { lastRef.current.mousePosition = { x: 0, y: 0 } }

      window.addEventListener("mousemove", onMove)
      window.addEventListener("touchmove", onTouch)
      document.body.addEventListener("mouseleave", onLeave)

      return () => {
        window.removeEventListener("mousemove", onMove)
        window.removeEventListener("touchmove", onTouch)
        document.body.removeEventListener("mouseleave", onLeave)
      }
    }, [handleOnMove])

    return null
  },
)

MouseSparkles.displayName = "MouseSparkles"
export { MouseSparkles }
