"use client"

import React, { useRef } from "react"
import { ConfettiButton } from "@/components/ui/confetti"

export interface HoloPricingCardData {
  name: string
  price: string
  desc: string
  features?: string[]
  cta?: string
  highlight?: boolean
}

export function HoloPricingCard({ name, price, desc, features, cta, highlight }: HoloPricingCardData) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10
    card.style.setProperty("--x", `${x}px`)
    card.style.setProperty("--y", `${y}px`)
    card.style.setProperty("--bg-x", `${(x / rect.width) * 100}%`)
    card.style.setProperty("--bg-y", `${(y / rect.height) * 100}%`)
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)"
    card.style.setProperty("--x", "50%")
    card.style.setProperty("--y", "50%")
    card.style.setProperty("--bg-x", "50%")
    card.style.setProperty("--bg-y", "50%")
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        {
          "--x": "50%",
          "--y": "50%",
          "--bg-x": "50%",
          "--bg-y": "50%",
          background: highlight
            ? "linear-gradient(135deg, #1a0a2e 0%, #2d0a4a 50%, #1a0a38 100%)"
            : "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0f1520 100%)",
          border: highlight
            ? "1.5px solid rgba(197,1,225,0.55)"
            : "1px solid rgba(255,255,255,0.08)",
          borderRadius: "1.25rem",
          padding: "2rem",
          position: "relative",
          overflow: "hidden",
          transition: "transform 0.12s ease, box-shadow 0.2s ease",
          cursor: "default",
          minHeight: "480px",
          display: "flex",
          flexDirection: "column",
          boxShadow: highlight
            ? "0 0 40px rgba(197,1,225,0.18)"
            : "0 4px 24px rgba(0,0,0,0.35)",
        } as React.CSSProperties
      }
    >
      {/* Radial glow follows cursor */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle 200px at var(--x) var(--y), rgba(197,1,225,0.22) 0%, rgba(255,106,99,0.10) 50%, transparent 75%)",
          pointerEvents: "none",
          transition: "background 0.05s",
        }}
      />

      {/* Shimmer stripe */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.055) var(--bg-x), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column" }}>
        {highlight && (
          <div style={{ marginBottom: "1rem" }}>
            <span
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                color: "#c084fc",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                background: "rgba(197,1,225,0.15)",
                padding: "0.2rem 0.7rem",
                borderRadius: "9999px",
                border: "1px solid rgba(197,1,225,0.3)",
              }}
            >
              Most popular
            </span>
          </div>
        )}

        <p
          style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            color: "rgba(255,255,255,0.35)",
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            marginBottom: "0.5rem",
          }}
        >
          {name}
        </p>

        <p
          style={{
            fontSize: "clamp(1.25rem, 4vw, 2.75rem)",
            fontWeight: 900,
            color: "#ffffff",
            marginBottom: "0.5rem",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {price}
        </p>

        <p
          style={{
            fontSize: "0.875rem",
            color: "rgba(255,255,255,0.45)",
            marginBottom: "1.5rem",
            lineHeight: 1.65,
          }}
        >
          {desc}
        </p>

        {features && features.length > 0 && (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 auto",
              display: "flex",
              flexDirection: "column",
              gap: "0.55rem",
            }}
          >
            {features.map((f, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                <span style={{ color: "#4ade80", flexShrink: 0, marginTop: "1px", fontSize: "0.8rem", fontWeight: 700 }}>
                  ✓
                </span>
                <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.72)" }}>{f}</span>
              </li>
            ))}
          </ul>
        )}

        {cta && (
          <div style={{ marginTop: "1.75rem" }}>
            <ConfettiButton
              className="w-full py-3 rounded-xl font-bold text-sm transition-all"
              style={
                highlight
                  ? { background: "linear-gradient(135deg, #c501e1, #ff6a63)", color: "#fff", border: "none" }
                  : { background: "rgba(255,255,255,0.95)", color: "#111", border: "none" }
              }
            >
              {cta}
            </ConfettiButton>
          </div>
        )}
      </div>
    </div>
  )
}
