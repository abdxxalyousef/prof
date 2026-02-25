"use client";

import { useEffect } from "react";

export default function InteractiveEffects() {
  useEffect(() => {
    const root = document.documentElement;
    let pointerRaf = 0;
    let scrollRaf = 0;

    const setPointer = (clientX: number, clientY: number) => {
      root.style.setProperty("--pointer-x", `${clientX}px`);
      root.style.setProperty("--pointer-y", `${clientY}px`);
      pointerRaf = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (pointerRaf !== 0) {
        return;
      }

      const { clientX, clientY } = event;
      pointerRaf = window.requestAnimationFrame(() => setPointer(clientX, clientY));
    };

    const setScrollProgress = () => {
      const maxScrollable = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScrollable));
      root.style.setProperty("--scroll-progress", progress.toFixed(4));
      scrollRaf = 0;
    };

    const onScroll = () => {
      if (scrollRaf !== 0) {
        return;
      }

      scrollRaf = window.requestAnimationFrame(setScrollProgress);
    };

    setScrollProgress();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      if (pointerRaf !== 0) {
        window.cancelAnimationFrame(pointerRaf);
      }
      if (scrollRaf !== 0) {
        window.cancelAnimationFrame(scrollRaf);
      }
    };
  }, []);

  return null;
}
