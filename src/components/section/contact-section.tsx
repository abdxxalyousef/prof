import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA } from "@/data/resume";

export default function ContactSection() {
  return (
    <div className="border rounded-xl p-10 relative">
      <div className="absolute -top-4 border bg-primary z-10 rounded-xl px-4 py-1 left-1/2 -translate-x-1/2">
        <span className="text-background text-sm font-medium">Contact</span>
      </div>
      <div className="absolute inset-0 top-0 left-0 right-0 h-1/2 rounded-xl overflow-hidden">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={3}
          gridGap={4}
          flickerChance={0.12}
          maxOpacity={0.18}
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>
      <div className="relative flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Get in Touch
        </h2>
        <p className="mx-auto max-w-lg text-muted-foreground text-balance">
          Phone: <span className="font-semibold text-foreground">+962 779 602 544</span>. WhatsApp is active now — choose how you want to reach me.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="https://wa.me/962779602544"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-transform duration-200 hover:scale-[1.03] hover:bg-green-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp Chat
          </Link>

          <a
            href="tel:+962779602544"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-transform duration-200 hover:scale-[1.03] hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
}

