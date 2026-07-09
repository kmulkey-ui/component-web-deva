"use client"

import React from "react"
import { cn } from "@/lib/utils"

export interface GlowCardItem {
  label: string
  title: string
  description: string
  gradientFrom: string
  gradientMid: string
  gradientTo: string
  glowColor: string
  panelRotate: string
}

const DEFAULT_CARDS: GlowCardItem[] = [
  {
    label: "design",
    title: "Sites that don't look like everyone else's",
    description: "No templates. No Lorem Ipsum still somehow in the footer. Just your aesthetic, built pixel by pixel.",
    gradientFrom: "#FF4136",
    gradientMid: "#FF851B",
    gradientTo: "#FF6B35",
    glowColor: "rgba(255,100,30,0.35)",
    panelRotate: "-4deg",
  },
  {
    label: "seo",
    title: "SEO so your dream clients find you first",
    description: "Spoiler: they're already googling. Will they find you, or someone way less talented?",
    gradientFrom: "#FF1493",
    gradientMid: "#9B59B6",
    gradientTo: "#3498DB",
    glowColor: "rgba(155,89,182,0.35)",
    panelRotate: "0deg",
  },
  {
    label: "ownership",
    title: "You own your corner of the internet",
    description: "No algorithm can shadow-ban your own domain. Wild concept, I know.",
    gradientFrom: "#1E90FF",
    gradientMid: "#00CED1",
    gradientTo: "#32CD32",
    glowColor: "rgba(0,206,209,0.35)",
    panelRotate: "4deg",
  },
]

interface GlowCardsProps {
  cards?: GlowCardItem[]
  className?: string
}

export function GlowCards({ cards = DEFAULT_CARDS, className }: GlowCardsProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8", className)}>
      {cards.map((card, i) => {
        const grad = `linear-gradient(135deg, ${card.gradientFrom} 0%, ${card.gradientMid} 50%, ${card.gradientTo} 100%)`
        return (
          <div key={i} className="relative flex flex-col items-center" style={{ paddingBottom: "2.5rem" }}>
            {/* Large radial glow blob behind everything */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 90% 80% at 50% 60%, ${card.glowColor}, transparent 70%)`,
                filter: "blur(18px)",
                transform: "scale(1.3)",
                zIndex: 0,
              }}
            />

            {/* Main card */}
            <div
              className="relative w-full rounded-2xl overflow-hidden bg-white shadow-md border border-gray-100/60 group hover:shadow-xl transition-shadow duration-300"
              style={{ zIndex: 2 }}
            >
              {/* Gradient top band */}
              <div
                className="h-36 w-full transition-all duration-500 group-hover:scale-[1.02]"
                style={{ background: grad }}
              />

              {/* Soft gradient bleed into white */}
              <div
                className="absolute top-24 left-0 right-0 h-20 pointer-events-none"
                style={{
                  background: `linear-gradient(to bottom, ${card.gradientTo}60, transparent)`,
                }}
              />

              {/* Content */}
              <div className="relative px-6 pb-7 pt-4 bg-white">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 block mb-2">
                  {card.label}
                </span>
                <h3 className="text-[1.05rem] font-black text-gray-900 leading-snug mb-3">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{card.description}</p>
                <button className="px-5 py-2 rounded-xl bg-white border-2 border-gray-200 text-sm font-bold text-gray-800 hover:border-gray-400 transition-colors">
                  Learn more
                </button>
              </div>
            </div>

            {/* Hanging gradient panel — behind the card, sticks out at bottom */}
            <div
              className="absolute bottom-0 left-1/2 rounded-2xl"
              style={{
                width: "72%",
                height: "100px",
                background: grad,
                transform: `translateX(-50%) rotate(${card.panelRotate})`,
                zIndex: 1,
                boxShadow: `0 12px 32px ${card.glowColor}`,
                opacity: 0.85,
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
