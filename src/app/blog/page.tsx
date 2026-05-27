import type { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Blog",
  description: "Coming soon.",
  openGraph: {
    title: "Blog",
    description: "Coming soon.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description: "Coming soon.",
  },
};

export default function BlogPage() {
  return (
    <section id="blog">
      <div className="flex flex-col items-center justify-center py-16 px-4 border border-border rounded-xl">
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          Coming soon
        </h1>
        <p className="text-sm text-muted-foreground text-center">
          This section is being prepared.
        </p>
      </div>
    </section>
  );
}
