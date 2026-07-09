"use client";
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ENSEMBLES = [
  { label: 'Solo',     sub: 'Guitar alone',         image: '/cp1.png', accent: '#93C5FD' },
  { label: 'Duo',      sub: 'Guitar + Bass',         image: '/cp2.png', accent: '#3B82F6' },
  { label: 'Trio',     sub: 'Guitar · Bass · Drums', image: '/cp3.png', accent: '#60A5FA' },
  { label: 'Quartet',  sub: 'Trio + Horn',           image: '/cp4.png', accent: '#BFDBFE' },
  { label: 'Quintet',  sub: 'Quartet + Keys',        image: '/cp5.png', accent: '#E8DFFF' },
  { label: 'Sextet',   sub: 'Full Ensemble',         image: '/cp6.png', accent: '#93C5FD' },
]

export default function EnsembleAccordion({ height = 420 }) {
  const [active, setActive] = useState(null)
  const heightVal = typeof height === 'number' ? `${height}px` : height

  return (
    <div
      style={{
        display: 'flex',
        gap: '5px',
        height: heightVal,
        borderRadius: '18px',
        overflow: 'hidden',
        boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
      }}
    >
      {ENSEMBLES.map((item, i) => {
        const isActive = active === i

        return (
          <motion.div
            key={item.label}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            animate={{ flex: isActive ? 5 : 1 }}
            transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              minWidth: 0,
              flexShrink: 0,
            }}
          >
            {/* Background photo */}
            <motion.img
              src={item.image}
              alt={item.label}
              animate={{ scale: isActive ? 1.07 : 1.0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
              }}
            />

            {/* Dark overlay — heavier when collapsed */}
            <motion.div
              animate={{ opacity: isActive ? 0.55 : 0.72 }}
              transition={{ duration: 0.45 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(4,6,18,0.95) 0%, rgba(4,6,18,0.3) 60%, rgba(4,6,18,0.1) 100%)',
              }}
            />

            {/* Accent glow at bottom when active */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '160px',
                    background: `linear-gradient(to top, ${item.accent}22 0%, transparent 100%)`,
                    pointerEvents: 'none',
                  }}
                />
              )}
            </AnimatePresence>

            {/* Thin accent line at bottom */}
            <motion.div
              animate={{ scaleX: isActive ? 1 : 0.4, opacity: isActive ? 1 : 0.3 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: `linear-gradient(to right, transparent, ${item.accent}, transparent)`,
                transformOrigin: 'center',
              }}
            />

            {/* ── Collapsed: vertical label ── */}
            <AnimatePresence>
              {!isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <p style={{
                    fontFamily: '"Helvetica Now Display", "Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontWeight: 100,
                    fontSize: '0.9rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(226,232,240,0.85)',
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                    transform: 'rotate(180deg)',
                    userSelect: 'none',
                    lineHeight: 1,
                  }}>
                    {item.label}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Expanded: full info panel ── */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.35, delay: 0.15 }}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '28px 26px',
                  }}
                >
                  <p style={{
                    fontFamily: '"Helvetica Now Display", "Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontWeight: 100,
                    fontSize: 'clamp(1.4rem, 3.5vw, 2.4rem)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#F1F5F9',
                    lineHeight: 1,
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {item.label}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}
