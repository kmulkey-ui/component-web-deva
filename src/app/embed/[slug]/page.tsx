import { notFound } from "next/navigation";
import { components } from "@/lib/registry";
import { ComponentRenderer } from "@/components/component-renderer";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return components.map((c) => ({ slug: c.slug }));
}

// Chrome-less render of a single component, used as the source for the
// gallery's live <iframe> thumbnails.
export default async function EmbedPage({ params }: Props) {
  const { slug } = await params;
  const entry = components.find((c) => c.slug === slug);
  if (!entry) notFound();

  return (
    <div className="min-h-screen w-full overflow-hidden bg-white">
      <ComponentRenderer slug={slug} />
    </div>
  );
}
