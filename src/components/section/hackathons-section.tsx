/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { Timeline, TimelineItem, TimelineConnectItem } from "@/components/timeline";

export default function HackathonsSection() {
  const [activeImage, setActiveImage] = useState<{
    src: string;
    alt: string;
    fromCollage?: boolean;
  } | null>(null);
  const [imageError, setImageError] = useState(false);
  const [isCollageOpen, setIsCollageOpen] = useState(false);
  const [activeCollageImages, setActiveCollageImages] = useState<string[]>([]);
  const isSmallCollage = activeCollageImages.length <= 2;
  const collageGridClass = isSmallCollage
    ? "md:grid-cols-2"
    : activeCollageImages.length <= 3
      ? "md:grid-cols-3"
      : "md:grid-cols-4";
  const collageMap: Record<string, string[]> = {
    "Integration between artificial intelligence and cybersecurity": [
      "/gopinegration/1.png",
      "/gopinegration/2.png",
      "/gopinegration/3.png",
      "/gopinegration/4.png",
      "/gopinegration/5.png",
      "/gopinegration/6.png",
      "/gopinegration/7.png",
      "/gopinegration/8.png",
    ],
    "love at first breach 2026 - TryHackMe": [
      "/10thworld/1.png",
      "/10thworld/2.png",
      "/10thworld/3.png",
      "/10thworld/4.png",
      "/10thworld/5.png",
    ],
    "Certificate of Appreciation - Fundamentals of Cybersecurity": [
      "/1779377578309.jpg",
      "/with%20docs.jpg",
    ],
  };

  useEffect(() => {
    if (!activeImage && !isCollageOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveImage(null);
        setIsCollageOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeImage, isCollageOpen]);

  return (
    <section id="hackathons" className="overflow-hidden">
      <div className="flex min-h-0 flex-col gap-y-8 w-full">
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="border bg-primary z-10 rounded-xl px-4 py-1">
              <span className="text-background text-sm font-medium">My achievements</span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>
          <div className="flex flex-col gap-y-3 items-center justify-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Skills over Degrees, Driven by Curiosity</h2>
            <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
              Skills are built in the field, not in classrooms. For me, Cybersecurity is a craft, not just a degree. I’m here to deconstruct systems and master the art of Red Teaming. It’s always about the knowledge and the next challenge.
            </p>
          </div>
        </div>
        <Timeline>
          {DATA.hackathons.map((hackathon) => (
            <TimelineItem key={hackathon.title + hackathon.dates} className="w-full flex items-start justify-between gap-10">
              <TimelineConnectItem className="flex items-start justify-center">
                {hackathon.image ? (
                  <div className="flex flex-col items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setImageError(false);
                        const collageImages = collageMap[hackathon.title];
                        if (collageImages) {
                          setActiveCollageImages(collageImages);
                          setIsCollageOpen(true);
                          setActiveImage(null);
                          return;
                        }

                        setActiveImage({
                          src: hackathon.image!,
                          alt: hackathon.title,
                        });
                      }}
                      className="group inline-flex bg-muted/40 z-10 shrink-0 overflow-hidden p-1 border-2 rounded-2xl shadow-xl ring-2 ring-primary/40 transition-transform duration-300 ease-out will-change-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      aria-label={`Enlarge ${hackathon.title} image`}
                    >
                      {collageMap[hackathon.title] ? (
                        <div className="relative h-20 w-[120px] overflow-hidden rounded-xl border border-border/60 bg-card/70 shadow-[0_10px_24px_-18px_color-mix(in_oklch,var(--primary)_40%,transparent)]">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,color-mix(in_oklch,var(--primary)_45%,transparent),transparent_45%),radial-gradient(circle_at_80%_90%,color-mix(in_oklch,var(--ring)_45%,transparent),transparent_50%)] opacity-70" />
                          <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-1 p-1">
                            {collageMap[hackathon.title].slice(0, 8).map((src, index) => (
                              <div
                                key={src}
                                className="overflow-hidden rounded-md border border-border/50 bg-muted/30"
                                style={{
                                  gridColumn: index % 3 === 0 ? "span 2" : "span 1",
                                  gridRow: index === 1 ? "span 2" : "span 1",
                                }}
                              >
                                <img
                                  src={src}
                                  alt="Collage preview"
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                          <div className="absolute bottom-1 right-1">
                            <div className="relative flex items-center gap-1.5 rounded-full border border-border/60 bg-primary px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-primary-foreground shadow-[0_10px_20px_-12px_color-mix(in_oklch,var(--primary)_85%,transparent)]">
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-foreground/70" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                              </span>
                              Click here
                            </div>
                            <div className="mt-0.5 rounded-full border border-border/50 bg-background/90 px-2 py-0.5 text-[7px] font-semibold uppercase tracking-[0.2em] text-foreground/80 shadow-sm">
                              Collage
                            </div>
                          </div>
                          <div className="absolute inset-0 ring-1 ring-primary/25" />
                        </div>
                      ) : (
                        <img
                          src={hackathon.image}
                          alt={hackathon.title}
                          className="block h-auto w-auto max-h-20 max-w-[120px] object-contain"
                        />
                      )}
                    </button>
                    <span className="text-[11px] text-muted-foreground">Click image to enlarge</span>
                  </div>
                ) : (
                  <div className="size-20 bg-card z-10 shrink-0 overflow-hidden p-2 border-2 rounded-2xl shadow-xl ring-2 ring-primary/40 flex-none" />
                )}
              </TimelineConnectItem>
              <div className="flex flex-1 flex-col justify-start gap-2 min-w-0">
                {hackathon.dates && (
                  <time className="text-xs text-muted-foreground">{hackathon.dates}</time>
                )}
                {hackathon.title && (
                  <h3 className="font-semibold leading-none">{hackathon.title}</h3>
                )}
                {hackathon.subtitle && (
                  <p className="golden-shine text-base font-extrabold uppercase tracking-[0.4em] text-transparent bg-clip-text">
                    {hackathon.subtitle}
                  </p>
                )}
                {hackathon.location && (
                  <p className="text-sm text-muted-foreground">{hackathon.location}</p>
                )}
                {hackathon.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed wrap-break-word">
                    {hackathon.description}
                  </p>
                )}
                {hackathon.links && hackathon.links.length > 0 && (
                  <div className="mt-1 flex flex-row flex-wrap items-start gap-2">
                    {hackathon.links.map((link, idx) => (
                      <Link
                        href={link.href}
                        key={idx}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Badge className="flex items-center gap-1.5 text-xs bg-primary text-primary-foreground">
                          {link.icon}
                          {link.title}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
      {activeImage && typeof document !== "undefined"
        ? createPortal(
            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/70 backdrop-blur-md p-6 modal-overlay-animate"
              role="dialog"
              aria-modal="true"
              aria-label="Enlarged certificate"
              onClick={() => {
                if (activeImage?.fromCollage) {
                  setIsCollageOpen(true);
                }
                setActiveImage(null);
              }}
            >
              <div className="relative w-full max-w-5xl modal-frame-animate">
                <div className="absolute inset-0 -z-10 rounded-[32px] bg-[radial-gradient(circle_at_top,_color-mix(in_oklch,_var(--primary)_18%,_transparent),_transparent_60%),radial-gradient(circle_at_bottom,_color-mix(in_oklch,_var(--ring)_22%,_transparent),_transparent_65%)] opacity-80 blur-2xl" />
                {imageError ? (
                  <div className="rounded-2xl border border-border bg-card px-6 py-8 text-center text-sm text-muted-foreground shadow-2xl">
                    Image failed to load. Try refreshing the page.
                  </div>
                ) : (
                  <img
                    src={activeImage.src}
                    alt={activeImage.alt}
                    className="block w-full max-h-[85vh] object-contain rounded-2xl border border-border bg-card shadow-2xl modal-image-animate"
                    onError={() => setImageError(true)}
                  />
                )}
              </div>
            </div>,
            document.body
          )
        : null}
      {isCollageOpen && typeof document !== "undefined"
        ? createPortal(
            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/70 backdrop-blur-md p-6 modal-overlay-animate"
              role="dialog"
              aria-modal="true"
              aria-label="Certificate collage"
              onClick={() => setIsCollageOpen(false)}
            >
              <div className="relative w-full max-w-5xl modal-frame-animate">
                <div className="absolute inset-0 -z-10 rounded-[32px] bg-[radial-gradient(circle_at_top,_color-mix(in_oklch,_var(--primary)_18%,_transparent),_transparent_60%),radial-gradient(circle_at_bottom,_color-mix(in_oklch,_var(--ring)_22%,_transparent),_transparent_65%)] opacity-80 blur-2xl" />
                <div
                  className={`inline-grid auto-rows-fr gap-4 rounded-3xl border border-border bg-card/80 p-2 shadow-2xl modal-image-animate ${collageGridClass}`}
                >
                  {activeCollageImages.map((src) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => {
                        setIsCollageOpen(false);
                        setImageError(false);
                        setActiveImage({
                          src,
                          alt: "Certificate collage",
                          fromCollage: true,
                        });
                      }}
                      className={`${isSmallCollage ? "aspect-[16/9]" : "aspect-[4/3]"} w-full overflow-hidden rounded-2xl border border-border bg-muted/30 transition-transform duration-200 ease-out hover:scale-[1.02]`}
                      aria-label="Open collage image"
                    >
                      <img
                        src={src}
                        alt="Certificate collage"
                        className="h-full w-full object-contain bg-black/5"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </section>
  );
}
