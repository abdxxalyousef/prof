"use client";

import React, { useEffect } from "react";

interface CoolModeProps {
  options: {
    particle: string;
  };
  children: React.ReactNode;
}

export const CoolMode: React.FC<CoolModeProps> = ({ options, children }) => {
  useEffect(() => {
    const container = document.querySelector(".cool-mode-container");
    if (container) {
      container.animate(
        [
          { transform: "scale(1)", opacity: 1 },
          { transform: "scale(1.1)", opacity: 0.9 },
          { transform: "scale(1)", opacity: 1 },
        ],
        {
          duration: 3000,
          iterations: Infinity,
        }
      );
    }
  }, []);

  return (
    <div
      className="cool-mode-container"
      style={{
        backgroundImage: `url(${options.particle})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {children}
    </div>
  );
};