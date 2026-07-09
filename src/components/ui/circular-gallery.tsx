'use client'

import React, { useState, useEffect, useRef, HTMLAttributes } from 'react'

const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(' ')

export interface GalleryItem {
  common: string
  binomial: string
  photo: { url: string; text: string; pos?: string; by: string }
  href?: string | null
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[]
  radius?: number
  autoRotateSpeed?: number
  /** If provided, overrides internal rotation state entirely */
  controlledRotation?: number
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 420, autoRotateSpeed = 0.015, controlledRotation, ...props }, ref) => {
    const [internalRotation, setInternalRotation] = useState(0)
    const [isScrolling, setIsScrolling] = useState(false)
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const animationFrameRef = useRef<number | null>(null)

    // Only wire up internal scroll + auto-rotate when not controlled externally
    useEffect(() => {
      if (controlledRotation !== undefined) return
      const handleScroll = () => {
        setIsScrolling(true)
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
        const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0
        setInternalRotation(scrollProgress * 360)
        scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 150)
      }
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => {
        window.removeEventListener('scroll', handleScroll)
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
      }
    }, [controlledRotation])

    useEffect(() => {
      if (controlledRotation !== undefined) return
      const autoRotate = () => {
        if (!isScrolling) setInternalRotation(prev => prev + autoRotateSpeed)
        animationFrameRef.current = requestAnimationFrame(autoRotate)
      }
      animationFrameRef.current = requestAnimationFrame(autoRotate)
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      }
    }, [isScrolling, autoRotateSpeed, controlledRotation])

    const rotation = controlledRotation !== undefined ? controlledRotation : internalRotation
    const CARD_W = 260
    const CARD_H = 360
    const anglePerItem = 360 / items.length

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular Gallery"
        className={cn('relative w-full h-full flex items-center justify-center', className)}
        style={{ perspective: '2000px' }}
        {...props}
      >
        <div
          className="relative w-full h-full"
          style={{ transform: `rotateY(${rotation}deg)`, transformStyle: 'preserve-3d' }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem
            const totalRotation = rotation % 360
            const relativeAngle = (itemAngle + totalRotation + 360) % 360
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle)
            const opacity = Math.max(0.2, 1 - normalizedAngle / 180)

            return (
              <div
                key={i}
                role="group"
                aria-label={item.common}
                className="absolute"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  left: '50%',
                  top: '50%',
                  marginLeft: -CARD_W / 2,
                  marginTop: -CARD_H / 2,
                  opacity,
                  transition: 'opacity 0.3s linear',
                }}
              >
                <div
                  className="relative w-full h-full rounded-2xl shadow-2xl overflow-hidden border border-white/20 cursor-pointer group"
                  onClick={() => item.href && window.open(item.href, '_blank')}
                >
                  {item.photo.url ? (
                    <img
                      src={item.photo.url}
                      alt={item.photo.text}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ objectPosition: item.photo.pos ?? 'center' }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 flex flex-col items-center justify-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-300 to-pink-300 opacity-60" />
                      <p className="text-[10px] font-black text-purple-300 uppercase tracking-widest text-center leading-tight">
                        Coming<br />Soon
                      </p>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <h2 className="text-sm font-black leading-tight">{item.common}</h2>
                    <em className="text-xs italic opacity-70">{item.binomial}</em>
                    {item.href && (
                      <p className="text-[10px] mt-1.5 opacity-0 group-hover:opacity-50 transition-opacity font-semibold uppercase tracking-wider">
                        Click to visit →
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)

CircularGallery.displayName = 'CircularGallery'
export { CircularGallery }
