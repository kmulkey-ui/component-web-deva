import { notFound } from "next/navigation";
import Link from "next/link";
import { components } from "@/lib/registry";
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

  return (
    <div className="min-h-screen flex flex-col bg-white text-black" style={{ fontFamily: "var(--font-hnd)" }}>
      {/* Top bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-black/10 bg-white/85 px-5 py-3 backdrop-blur-md">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-black"
          style={{ fontWeight: 300 }}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
          Library
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-400" style={{ fontWeight: 400 }}>
            {entry.category}
          </span>
          <span className="h-3 w-px bg-black/15" />
          <span className="text-sm tracking-tight text-black" style={{ fontWeight: 300 }}>
            {entry.name}
          </span>
        </div>

        <div style={{ width: "72px" }} />
      </header>

      {/* Component preview */}
      <div className="flex-1 overflow-auto">
        <ComponentRenderer slug={slug} />
      </div>
    </div>
  );
}
