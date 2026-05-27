"use client";

import { useEffect, useState } from "react";

const MIN_DURATION_MS = 1400;
const EXIT_DURATION_MS = 720;

export default function LoaderOverlay() {
  const [phase, setPhase] = useState<"loading" | "exiting" | "done">(
    "loading"
  );

  useEffect(() => {
    let cancelled = false;
    const start = performance.now();

    const finish = () => {
      if (cancelled) {
        return;
      }
      const elapsed = performance.now() - start;
      const remaining = Math.max(0, MIN_DURATION_MS - elapsed);

      window.setTimeout(() => {
        if (cancelled) {
          return;
        }
        setPhase("exiting");
        window.setTimeout(() => {
          if (!cancelled) {
            setPhase("done");
          }
        }, EXIT_DURATION_MS);
      }, remaining);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish);
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", finish);
    };
  }, []);

  useEffect(() => {
    if (phase !== "done") {
      document.body.classList.add("loader-lock");
    } else {
      document.body.classList.remove("loader-lock");
    }
  }, [phase]);

  if (phase === "done") {
    return null;
  }

  return (
    <div
      className={`loader-screen ${phase === "exiting" ? "loader-exit" : ""}`}
      aria-hidden
    >
      <div className="loader-grid" />
      <div className="loader-scan" />
      <div className="loader-orb" />
      <div className="loader-core">
        <div className="loader-logo">
          <span className="loader-ring" />
          <span className="loader-ring loader-ring--inner" />
          <span className="loader-center" />
        </div>
        <div className="loader-text">
          <span className="loader-title">Secure Interface</span>
          <span className="loader-subtitle">Initializing Cyber Systems</span>
        </div>
        <div className="loader-bars">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
