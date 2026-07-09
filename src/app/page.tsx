import { components, categories } from "@/lib/registry";
import { LivePreview } from "@/components/live-preview";

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-white text-black" style={{ fontFamily: "var(--font-hnd)" }}>
      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="mx-auto max-w-[1400px] px-6 pt-24 pb-16 md:pt-32 md:pb-24">
        <p className="text-xs tracking-[0.35em] uppercase text-neutral-400" style={{ fontWeight: 400 }}>
          Katelyn Mulkey
        </p>
        <h1
          className="mt-5 text-5xl leading-[0.95] tracking-tight md:text-7xl lg:text-8xl"
          style={{ fontWeight: 100 }}
        >
          Component
          <br />
          Library
        </h1>
        <p className="mt-8 max-w-md text-sm leading-relaxed text-neutral-500" style={{ fontWeight: 300 }}>
          {components.length} interactive components &amp; animations. Every tile below is live —
          hover to feel it, click to open the full preview.
        </p>
      </header>

      {/* ── Sections ────────────────────────────────────────────── */}
      <main className="mx-auto max-w-[1400px] px-6 pb-32">
        {categories.map((category) => {
          const items = components.filter((c) => c.category === category);
          if (items.length === 0) return null;

          return (
            <section key={category} className="mb-24">
              <div className="mb-8 flex items-baseline justify-between border-b border-black/10 pb-4">
                <h2 className="text-sm tracking-[0.25em] uppercase text-black" style={{ fontWeight: 400 }}>
                  {category}
                </h2>
                <span className="text-xs tabular-nums text-neutral-400" style={{ fontWeight: 300 }}>
                  {String(items.length).padStart(2, "0")}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((comp, i) => (
                  <LivePreview key={comp.slug} slug={comp.slug} name={comp.name} index={i} />
                ))}
              </div>
            </section>
          );
        })}
      </main>

      <footer className="border-t border-black/10 py-10 text-center">
        <p className="text-xs tracking-[0.25em] uppercase text-neutral-400" style={{ fontWeight: 300 }}>
          {components.length} Components
        </p>
      </footer>
    </div>
  );
}
