"use client";

import { useEffect, useState } from "react";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";

const PJ_THEME_CLASS = "pj-theme";
const PJ_THEME_STORAGE_KEY = "portfolio-pj-theme";

export default function Navbar() {
  const [isPjThemeEnabled, setIsPjThemeEnabled] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    const saved = window.localStorage.getItem(PJ_THEME_STORAGE_KEY);
    return saved !== "0";
  });

  useEffect(() => {
    const root = document.documentElement;
    const saved = localStorage.getItem(PJ_THEME_STORAGE_KEY);
    const shouldEnable = saved !== "0";

    root.classList.toggle(PJ_THEME_CLASS, shouldEnable);
    if (saved === null) {
      localStorage.setItem(PJ_THEME_STORAGE_KEY, "1");
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    let rafId = 0;

    const syncScrollVars = () => {
      const scrollY = window.scrollY || 0;
      const maxScrollable = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const progress = Math.min(1, Math.max(0, scrollY / maxScrollable));
      const sway = Math.sin(scrollY / 42);

      root.style.setProperty("--pj-scroll", `${scrollY}px`);
      root.style.setProperty("--pj-scroll-progress", progress.toFixed(4));
      root.style.setProperty("--pj-fringe-sway", `${(sway * 0.9).toFixed(3)}deg`);
      rafId = 0;
    };

    const onScroll = () => {
      if (rafId !== 0) {
        return;
      }
      rafId = window.requestAnimationFrame(syncScrollVars);
    };

    syncScrollVars();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const togglePjTheme = () => {
    const root = document.documentElement;
    const nextValue = !isPjThemeEnabled;

    root.classList.toggle(PJ_THEME_CLASS, nextValue);
    localStorage.setItem(PJ_THEME_STORAGE_KEY, nextValue ? "1" : "0");
    setIsPjThemeEnabled(nextValue);
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30">
      <Dock className="z-50 pointer-events-auto relative h-14 p-2 w-fit mx-auto flex gap-2 border bg-card/90 backdrop-blur-3xl shadow-[0_0_10px_3px] shadow-primary/5">
        {DATA.navbar.map((item) => {
          const isExternal = item.href.startsWith("http");
          return (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <a
                  href={item.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                >
                  <DockIcon className="rounded-3xl cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors">
                    <item.icon className="size-full rounded-sm overflow-hidden object-contain" />
                  </DockIcon>
                </a>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                sideOffset={8}
                className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
              >
                <p>{item.label}</p>
                <TooltipArrow className="fill-primary" />
              </TooltipContent>
            </Tooltip>
          );
        })}
        <Separator
          orientation="vertical"
          className="h-2/3 m-auto w-px bg-border"
        />
        {Object.entries(DATA.contact.social)
          .filter(([_, social]) => social.navbar)
          .map(([name, social], index) => {
            const isExternal = social.url.startsWith("http");
            const IconComponent = social.icon;
            return (
              <Tooltip key={`social-${name}-${index}`}>
                <TooltipTrigger asChild>
                  <a
                    href={social.url}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                  >
                    <DockIcon className="rounded-3xl cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors">
                      <IconComponent className="size-full rounded-sm overflow-hidden object-contain" />
                    </DockIcon>
                  </a>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  sideOffset={8}
                  className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
                >
                  <p>{name}</p>
                  <TooltipArrow className="fill-primary" />
                </TooltipContent>
              </Tooltip>
            );
          })}
        <Separator
          orientation="vertical"
          className="h-2/3 m-auto w-px bg-border"
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              aria-label="Jordanian Palestinian Theme"
              onClick={togglePjTheme}
            >
              <DockIcon
                className={`rounded-3xl cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors ${
                  isPjThemeEnabled ? "ring-2 ring-primary/60" : ""
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-full rounded-sm overflow-hidden object-contain"
                  role="img"
                  aria-hidden="true"
                >
                  <defs>
                    <clipPath id="theme-badge-clip">
                      <rect x="1" y="1" width="22" height="22" rx="6" />
                    </clipPath>
                    <pattern id="kufiya-grid" width="4" height="4" patternUnits="userSpaceOnUse">
                      <rect width="4" height="4" fill="#F8FAFC" />
                      <path d="M0 0 L4 4 M4 0 L0 4" stroke="#111827" strokeWidth="0.75" />
                    </pattern>
                    <pattern id="shemagh-grid" width="4" height="4" patternUnits="userSpaceOnUse">
                      <rect width="4" height="4" fill="#FFFFFF" />
                      <rect x="0" y="0" width="2" height="2" fill="#C81E1E" opacity="0.9" />
                      <rect x="2" y="2" width="2" height="2" fill="#C81E1E" opacity="0.9" />
                    </pattern>
                  </defs>

                  <g clipPath="url(#theme-badge-clip)">
                    <rect x="0" y="0" width="12" height="24" fill="url(#kufiya-grid)" />
                    <rect x="12" y="0" width="12" height="24" fill="url(#shemagh-grid)" />
                    <line x1="12" y1="0" x2="12" y2="24" stroke="rgba(255,255,255,0.9)" strokeWidth="1" />
                  </g>

                  <rect
                    x="0.75"
                    y="0.75"
                    width="22.5"
                    height="22.5"
                    rx="4"
                    fill="none"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="1"
                  />
                </svg>
              </DockIcon>
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            sideOffset={8}
            className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
          >
            <p>
              Jordanian / Palestinian Theme {isPjThemeEnabled ? "(On)" : "(Off)"}
            </p>
            <TooltipArrow className="fill-primary" />
          </TooltipContent>
        </Tooltip>
        <Separator
          orientation="vertical"
          className="h-2/3 m-auto w-px bg-border"
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <DockIcon className="rounded-3xl cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors">
              <ModeToggle className="size-full cursor-pointer" />
            </DockIcon>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            sideOffset={8}
            className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
          >
            <p>Theme</p>
            <TooltipArrow className="fill-primary" />
          </TooltipContent>
        </Tooltip>
      </Dock>
    </div>
  );
}
