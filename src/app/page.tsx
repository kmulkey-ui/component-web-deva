import Link from "next/link";
import { components, categories, categoryStyle } from "@/lib/registry";
import { ShimmerText } from "@/components/ui/shimmer-text";

export default function GalleryPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #fce7f3 0%, #f3e8ff 35%, #e0f2fe 70%, #fce7f3 100%)",
      }}
    >
      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="pt-16 pb-10 px-6 text-center">
        <div className="text-6xl mb-4 select-none" style={{ filter: "drop-shadow(0 4px 12px rgba(236,72,153,0.3))" }}>
          🪷
        </div>
        <h1
          className="flex flex-col items-center gap-1"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          <ShimmerText
            variant="pink"
            duration={2}
            delay={0.5}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[0.12em] uppercase"
          >
            Katelyn&apos;s Bank of
          </ShimmerText>
          <ShimmerText
            variant="fuchsia"
            duration={2}
            delay={1.2}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[0.12em] uppercase"
          >
            Components &amp; Animations
          </ShimmerText>
        </h1>
        <p className="mt-4 text-rose-400/80 text-sm tracking-widest uppercase"
           style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
          {components.length} components &nbsp;&middot;&nbsp; click any to preview live
        </p>
      </header>

      {/* ── Category Menu Blocks ────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 pb-20 space-y-8">
        {categories.map((category) => {
          const items = components.filter((c) => c.category === category);
          if (items.length === 0) return null;
          const style = categoryStyle[category];

          return (
            <section
              key={category}
              className={`rounded-2xl border-2 ${style.bg} ${style.border} overflow-hidden shadow-sm`}
            >
              {/* Section header band */}
              <div className={`px-6 py-3 border-b-2 ${style.heading} ${style.border} flex items-center justify-between`}>
                <h2
                  className="text-xs font-bold tracking-[0.2em] uppercase"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  {category}
                </h2>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${style.badge}`}>
                  {items.length} components
                </span>
              </div>

              {/* Grid of component cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 divide-x-0">
                {items.map((comp, i) => (
                  <Link
                    key={comp.slug}
                    href={`/preview/${comp.slug}`}
                    className={`group flex items-start gap-4 px-5 py-4 hover:bg-white/60 transition-all duration-150 border-b ${style.border} last:border-b-0 sm:last:border-b-0`}
                  >
                    {/* Number */}
                    <span
                      className={`shrink-0 text-2xl font-bold tabular-nums ${style.num} opacity-60 mt-0.5`}
                      style={{ fontFamily: "var(--font-playfair), serif", minWidth: "2rem" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-[11px] font-bold tracking-[0.15em] uppercase text-gray-800 leading-tight group-hover:text-gray-900 transition-colors"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                      >
                        {comp.name}
                      </h3>
                      <p
                        className="mt-1 text-xs text-gray-500 leading-relaxed line-clamp-2"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 300 }}
                      >
                        {comp.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <svg
                      className="shrink-0 w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all mt-1"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </main>

      <footer className="pb-10 text-center text-[11px] text-rose-300/60 tracking-widest uppercase"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
        Preview only
      </footer>
    </div>
  );
}
