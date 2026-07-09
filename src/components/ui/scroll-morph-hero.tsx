"use client"

import { useEffect, useRef, useState } from "react"
import { CircularGallery, GalleryItem } from "@/components/ui/circular-gallery"

const ITEMS: GalleryItem[] = [
  {
    common: "MattChapinMusic.com",
    binomial: "Independent Artist Website",
    photo: { url: "/matt-chapin.jpg", text: "Matt Chapin Music", by: "" },
    href: "https://mattchapinmusic.com",
  },
  {
    common: "Custom Website Hero",
    binomial: "ACDC 2026 · New Orleans",
    photo: { url: "/nola-skyline.png", text: "NOLA Skyline Hero", by: "" },
    href: "/acdc-hero/index.html",
  },
  {
    common: "Custom Website Hero",
    binomial: "Full Artist Site",
    photo: {
      url: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fsplendorous-bienenstitch-8225df.netlify.app%2F?w=400&h=560",
      text: "Full Artist Site",
      by: "",
    },
    href: "https://splendorous-bienenstitch-8225df.netlify.app/",
  },
]

// Two full rotations worth of scroll delta to consume
const MAX_SCROLL = 3200

export default function ScrollMorphPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const consumedRef = useRef(0)
  const [rotation, setRotation] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      if (done) return

      // Check if container is in the viewport
      const rect = el.getBoundingClientRect()
      const inView = rect.top <= 80 && rect.bottom >= window.innerHeight * 0.5
      if (!inView) return

      const remaining = MAX_SCROLL - consumedRef.current
      if (remaining <= 0) {
        setDone(true)
        return
      }

      // Consume the scroll delta up to the remaining budget
      const consume = Math.min(Math.abs(e.deltaY), remaining)
      if (e.deltaY > 0) {
        e.preventDefault()
        consumedRef.current += consume
        const progress = consumedRef.current / MAX_SCROLL
        setRotation(progress * 720) // 2 full rotations = 720°
        if (consumedRef.current >= MAX_SCROLL) {
          setDone(true)
        }
      }
    }

    let touchY = 0
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY }
    const onTouchMove = (e: TouchEvent) => {
      if (done) return
      const rect = el.getBoundingClientRect()
      const inView = rect.top <= 80 && rect.bottom >= window.innerHeight * 0.5
      if (!inView) return
      const remaining = MAX_SCROLL - consumedRef.current
      if (remaining <= 0) { setDone(true); return }
      const dy = touchY - e.touches[0].clientY
      touchY = e.touches[0].clientY
      if (dy > 0) {
        e.preventDefault()
        const consume = Math.min(dy * 2, remaining)
        consumedRef.current += consume
        setRotation((consumedRef.current / MAX_SCROLL) * 720)
        if (consumedRef.current >= MAX_SCROLL) setDone(true)
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: false })
    return () => {
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
    }
  }, [done])

  const progress = Math.min(consumedRef.current / MAX_SCROLL, 1)

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-white overflow-hidden select-none flex flex-col"
    >
      {/* Header */}
      <div className="flex-shrink-0 pt-8 pb-2 text-center z-30 pointer-events-none px-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-1">
          creative web design
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
          Examples of my work.
        </h2>
        <p className="text-xs text-gray-400 mt-1.5">
          {done ? "Click a card to visit →" : "Scroll to spin · click to visit"}
        </p>
      </div>

      {/* Gallery */}
      <div className="flex-1 min-h-0">
        <CircularGallery items={ITEMS} radius={380} controlledRotation={rotation} />
      </div>

      {/* Progress bar */}
      {!done && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-gray-200 rounded-full overflow-hidden z-30">
          <div
            className="h-full bg-gray-400 rounded-full transition-all duration-75"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      )}
    </div>
  )
}
