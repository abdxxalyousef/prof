"use client";

import { useEffect } from "react";

export default function InteractiveEffects() {
  useEffect(() => {
    const root = document.documentElement;
    let pointerRaf = 0;
    let scrollRaf = 0;
    let lastPointerX = -1;
    let lastPointerY = -1;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const hardwareConcurrency = navigator.hardwareConcurrency ?? 4;
    const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
    const isLowEndDevice =
      prefersReducedMotion || hardwareConcurrency <= 4 || deviceMemory <= 4;

    root.classList.toggle("perf-lite", isLowEndDevice);

    const setPointer = (clientX: number, clientY: number) => {
      root.style.setProperty("--pointer-x", `${clientX}px`);
      root.style.setProperty("--pointer-y", `${clientY}px`);
      lastPointerX = clientX;
      lastPointerY = clientY;
      pointerRaf = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (isCoarsePointer) {
        return;
      }

      if (
        lastPointerX !== -1 &&
        Math.abs(event.clientX - lastPointerX) < 6 &&
        Math.abs(event.clientY - lastPointerY) < 6
      ) {
        return;
      }

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

    setPointer(window.innerWidth / 2, 0);
    setScrollProgress();
    if (!isCoarsePointer) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (!isCoarsePointer) {
        window.removeEventListener("pointermove", onPointerMove);
      }
      window.removeEventListener("scroll", onScroll);
      root.classList.remove("perf-lite");
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
