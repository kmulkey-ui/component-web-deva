import { notFound } from "next/navigation";
import Link from "next/link";
import { components, categoryStyle } from "@/lib/registry";
import { ComponentRenderer } from "@/components/component-renderer";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return components.map((c) => ({ slug: c.slug }));
}

export default async function PreviewPage({ params }: Props) {
  const { slug } = await params;
  const entry = components.find((c) => c.slug === slug);
  if (!entry) notFound();

  const style = categoryStyle[entry.category];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg, #fce7f3 0%, #f3e8ff 35%, #e0f2fe 70%, #fce7f3 100%)" }}
    >
      {/* Top bar */}
      <header
        className="flex items-center justify-between px-5 py-3 z-50 sticky top-0 border-b"
        style={{
          background: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(14px)",
          borderColor: "rgba(236,72,153,0.12)",
        }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Gallery
        </Link>

        <div className="flex items-center gap-3">
          <span
            className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full ${style.badge}`}
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            {entry.category}
          </span>
          <span
            className="font-bold tracking-[0.15em] uppercase text-gray-700"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px" }}
          >
            {entry.name}
          </span>
        </div>

        <div style={{ width: "64px" }} />
      </header>

      {/* Component preview */}
      <div className="flex-1 overflow-auto">
        <ComponentRenderer slug={slug} />
      </div>
    </div>
  );
}
