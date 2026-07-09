"use client";
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * WaveScene — guitar illustration as a full-bleed section background.
 * The image fills the block; animated SVG waves and staff notation are
 * layered on top; gradient edges dissolve it into the dark site bg.
 */
export default function WaveScene() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // Subtle parallax: image shifts slightly slower than the page
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(300px, 38vw, 480px)',
        overflow: 'hidden',
        background: '#040e1c',
      }}
      aria-hidden="true"
    >
      {/* ── Guitar illustration — fills the section ────── */}
      <motion.img
        src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1600&q=80"
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '115%',   /* slightly taller so parallax has room */
          objectFit: 'cover',
          objectPosition: 'center 40%',
          top: '-7.5%',
          y: imgY,
        }}
      />

      {/* ── Dark tint so it reads as an accent, not a photo ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(4,14,28,0.38)',
      }} />

      {/* ── Animated wave SVG overlay at the bottom ──── */}
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          width: '100%',
          height: '200px',
          pointerEvents: 'none',
        }}
      >
        <motion.path
          d="M0,100 C360,60 720,140 1080,100 C1260,80 1380,115 1440,105 L1440,200 L0,200 Z"
          fill="#EDE8DF"
          animate={{ d: [
            'M0,100 C360,60 720,140 1080,100 C1260,80 1380,115 1440,105 L1440,200 L0,200 Z',
            'M0,112 C360,80 720,128 1080,112 C1260,96 1380,124 1440,116 L1440,200 L0,200 Z',
            'M0,100 C360,60 720,140 1080,100 C1260,80 1380,115 1440,105 L1440,200 L0,200 Z',
          ]}}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M0,130 C240,105 480,150 720,130 C960,110 1200,150 1440,130 L1440,200 L0,200 Z"
          fill="#EDE8DF"
          opacity="0.75"
          animate={{ d: [
            'M0,130 C240,105 480,150 720,130 C960,110 1200,150 1440,130 L1440,200 L0,200 Z',
            'M0,120 C240,98 480,142 720,120 C960,100 1200,142 1440,120 L1440,200 L0,200 Z',
            'M0,130 C240,105 480,150 720,130 C960,110 1200,150 1440,130 L1440,200 L0,200 Z',
          ]}}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        />
      </svg>

      {/* ── Wave SVG overlay at the top ──────────────── */}
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          width: '100%',
          height: '200px',
          transform: 'scaleY(-1)',
          pointerEvents: 'none',
        }}
      >
        <motion.path
          d="M0,80 C360,120 720,40 1080,80 C1260,100 1380,65 1440,75 L1440,200 L0,200 Z"
          fill="#EDE8DF"
          animate={{ d: [
            'M0,80 C360,120 720,40 1080,80 C1260,100 1380,65 1440,75 L1440,200 L0,200 Z',
            'M0,92 C360,130 720,52 1080,92 C1260,112 1380,76 1440,86 L1440,200 L0,200 Z',
            'M0,80 C360,120 720,40 1080,80 C1260,100 1380,65 1440,75 L1440,200 L0,200 Z',
          ]}}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        />
      </svg>

      {/* ── Sheet music notation — lower right corner ── */}
      <svg
        viewBox="0 0 500 160"
        style={{
          position: 'absolute',
          bottom: '60px',
          right: '40px',
          width: 'clamp(180px, 28vw, 380px)',
          opacity: 0.22,
          pointerEvents: 'none',
        }}
      >
        {/* 5 staff lines */}
        {[0, 14, 28, 42, 56].map((y) => (
          <line key={y} x1="0" y1={60 + y} x2="500" y2={60 + y} stroke="#4dd0e1" strokeWidth="1.2" />
        ))}
        {/* Treble clef */}
        <text x="4" y="122" fontFamily="serif" fontSize="70" fill="#4dd0e1">𝄞</text>
        {/* Notes */}
        {[
          { cx: 90,  cy: 72 },
          { cx: 148, cy: 60 },
          { cx: 208, cy: 76 },
          { cx: 268, cy: 64 },
          { cx: 330, cy: 54 },
          { cx: 390, cy: 70 },
          { cx: 448, cy: 62 },
        ].map(({ cx, cy }, i) => (
          <g key={i}>
            <ellipse cx={cx} cy={cy} rx="11" ry="7.5" transform={`rotate(-15 ${cx} ${cy})`} fill="#4dd0e1" />
            <line x1={cx + 11} y1={cy} x2={cx + 11} y2={cy - 36} stroke="#4dd0e1" strokeWidth="1.6" />
          </g>
        ))}
        {/* Bar lines */}
        <line x1="230" y1="58" x2="230" y2="118" stroke="#4dd0e1" strokeWidth="1.2" />
        <line x1="355" y1="58" x2="355" y2="118" stroke="#4dd0e1" strokeWidth="1.2" />
      </svg>

      {/* ── Hard left/right edge fades ────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(to right, #EDE8DF 0%, transparent 18%, transparent 82%, #EDE8DF 100%)',
      }} />
    </div>
  )
}
