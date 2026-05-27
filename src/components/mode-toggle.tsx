"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { runThemeTransition } from "@/lib/theme-transition";

export function ModeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Button
      type="button"
      variant="link"
      size="icon"
      className={cn(className)}
      onClick={(event) =>
        runThemeTransition(() => {
          if (!resolvedTheme) {
            return;
          }
          const root = document.documentElement;
          root.style.setProperty("--theme-x", `${event.clientX}px`);
          root.style.setProperty("--theme-y", `${event.clientY}px`);
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
        })
      }
    >
      <span className="relative block h-full w-full">
        <SunIcon
          className={`absolute inset-0 h-full w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isMounted && isDark
              ? "opacity-0 rotate-90 scale-75"
              : "opacity-100 rotate-0 scale-100"
          }`}
        />
        <MoonIcon
          className={`absolute inset-0 h-full w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isMounted && isDark
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-75"
          }`}
        />
      </span>
    </Button>
  );
}
