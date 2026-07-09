"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from "@/lib/utils"

interface TextItem {
  text: string
  image: string
}

interface CircularRevealHeadingProps {
  items: TextItem[]
  centerText: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeConfig = {
  sm: { container: 'h-[300px] w-[300px]', fontSize: 'text-xs',   tracking: 'tracking-[0.25em]', radius: 120, gap: 40, imageSize: 'w-[75%] h-[75%]', textStyle: 'font-medium' },
  md: { container: 'h-[400px] w-[400px]', fontSize: 'text-sm',   tracking: 'tracking-[0.3em]',  radius: 160, gap: 30, imageSize: 'w-[75%] h-[75%]', textStyle: 'font-medium' },
  lg: { container: 'h-[500px] w-[500px]', fontSize: 'text-base', tracking: 'tracking-[0.35em]', radius: 160, gap: 20, imageSize: 'w-[75%] h-[75%]', textStyle: 'font-medium' },
}

function ImageOverlay({ image, size = 'md' }: { image: string; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
    >
      <img
        src={image}
        alt=""
        className={cn(sizeConfig[size].imageSize, "object-cover rounded-full")}
        style={{ filter: 'brightness(0.95)' }}
      />
    </motion.div>
  )
}

export function CircularRevealHeading({ items, centerText, className, size = 'md' }: CircularRevealHeadingProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null)
  const config = sizeConfig[size]

  const createTextSegments = () => {
    const totalItems = items.length
    const totalGapDegrees = config.gap * totalItems
    const availableDegrees = 360 - totalGapDegrees
    const segmentDegrees = availableDegrees / totalItems

    return items.map((item, index) => {
      const startPosition = index * (segmentDegrees + config.gap)
      const startOffset = `${(startPosition / 360) * 100}%`

      return (
        <g key={index}>
          <text
            style={{
              fontSize: size === 'lg' ? '14px' : size === 'md' ? '12px' : '10px',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              userSelect: 'none',
            }}
            onMouseEnter={() => setActiveImage(item.image)}
            onMouseLeave={() => setActiveImage(null)}
          >
            <textPath
              href="#circleRevealCurve"
              fill="#666666"
              startOffset={startOffset}
              textLength={`${segmentDegrees * 1.8}`}
              lengthAdjust="spacingAndGlyphs"
            >
              {item.text}
            </textPath>
          </text>
        </g>
      )
    })
  }

  return (
    <motion.div
      whileHover={{ boxShadow: "20px 20px 40px #bebebe, -20px -20px 40px #ffffff" }}
      whileTap={{ scale: 0.98 }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className={cn(
        "relative overflow-hidden",
        config.container,
        "rounded-full bg-[#e6e6e6]",
        "shadow-[16px_16px_32px_#bebebe,-16px_-16px_32px_#ffffff]",
        "transition-shadow duration-500 ease-out",
        className
      )}
    >
      {/* Image reveal — above everything */}
      <AnimatePresence>
        {activeImage && <ImageOverlay image={activeImage} size={size} />}
      </AnimatePresence>

      {/* Decorative neumorphic rings — pointer-events-none so they don't block hover */}
      <div
        className="absolute inset-[2px] rounded-full bg-[#e6e6e6] pointer-events-none"
        style={{ boxShadow: "inset 6px 6px 12px #d1d1d1, inset -6px -6px 12px #ffffff" }}
      />
      <div
        className="absolute inset-[12px] rounded-full bg-[#e6e6e6] pointer-events-none"
        style={{ boxShadow: "inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff" }}
      />

      {/* Center text — hidden while image is shown */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <AnimatePresence>
          {!activeImage && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 p-6 rounded-3xl bg-[#e6e6e6] text-center"
            >
              {centerText}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Rotating text ring — on top so pointer events reach it */}
      <motion.div
        className="absolute inset-0"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{ zIndex: 30 }}
      >
        <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible">
          <path
            id="circleRevealCurve"
            fill="none"
            stroke="none"
            d={`M 200,200 m -${config.radius},0 a ${config.radius},${config.radius} 0 1,1 ${config.radius * 2},0 a ${config.radius},${config.radius} 0 1,1 -${config.radius * 2},0`}
          />
          {createTextSegments()}
        </svg>
      </motion.div>
    </motion.div>
  )
}
