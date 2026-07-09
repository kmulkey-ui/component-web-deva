"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const LOGICAL_W = 1200;
const LOGICAL_H = 800; // 3:2 to match the viewport aspect-ratio

export function LivePreview({
  slug,
  name,
  index,
}: {
  slug: string;
  name: string;
  index: number;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false); // in/near viewport -> mount iframe
  const [loaded, setLoaded] = useState(false);
  const [width, setWidth] = useState(0);

  // Mount the iframe only while the card is near the viewport, and unmount
  // when it scrolls far away — keeps the number of live (WebGL) contexts low.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setNear(entry.isIntersecting);
        if (!entry.isIntersecting) setLoaded(false);
      },
      { rootMargin: "400px 0px" }
    );
    io.observe(el);
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => {
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  const scale = width > 0 ? width / LOGICAL_W : 0;

  return (
    <Link
      href={`/preview/${slug}`}
      className="group block"
      aria-label={`Preview ${name}`}
    >
      <div
        ref={viewportRef}
        className="relative w-full overflow-hidden rounded-lg border border-black/10 bg-white transition-all duration-300 group-hover:border-black/30 group-hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.25)]"
        style={{ aspectRatio: "3 / 2" }}
      >
        {/* Live component thumbnail (non-interactive; click opens full preview) */}
        {near && scale > 0 && (
          <iframe
            src={`/embed/${slug}`}
            title={name}
            tabIndex={-1}
            scrolling="no"
            onLoad={() => setLoaded(true)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${LOGICAL_W}px`,
              height: `${LOGICAL_H}px`,
              border: "0",
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              pointerEvents: "none",
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          />
        )}

        {/* Placeholder while (re)loading */}
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-50">
            <span className="text-[11px] tracking-[0.25em] uppercase text-neutral-300" style={{ fontWeight: 300 }}>
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        )}

        {/* Hover affordance */}
        <div className="pointer-events-none absolute inset-0 flex items-end justify-end p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="rounded-full bg-black px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-white" style={{ fontWeight: 400 }}>
            View
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-3">
        <span className="text-[11px] tabular-nums text-neutral-300" style={{ fontWeight: 300 }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-sm tracking-tight text-black transition-colors" style={{ fontWeight: 300 }}>
          {name}
        </h3>
      </div>
    </Link>
  );
}
