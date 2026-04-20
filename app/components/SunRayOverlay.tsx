"use client";
import { useEffect, useState } from "react";

/**
 * Vạt nắng — sweeps one warm diagonal ray across the frame each time the
 * slide becomes active. Uses key-remount trick to replay the CSS animation.
 */
export default function SunRayOverlay({ active }: { active: boolean }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (active) setTick((t) => t + 1);
  }, [active]);

  if (!active) return null;

  return (
    <div
      key={tick}
      className="absolute inset-0 overflow-hidden pointer-events-none z-10"
    >
      {/* Wide primary ray */}
      <div
        className="animate-sunray absolute"
        style={{
          top: "-20%",
          left: "-45%",
          width: "55%",
          height: "140%",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,235,130,0.18) 38%, rgba(255,248,200,0.30) 52%, rgba(255,235,130,0.14) 68%, transparent 100%)",
          transform: "skewX(-18deg)",
        }}
      />
      {/* Thinner secondary ray, slightly delayed */}
      <div
        className="animate-sunray-late absolute"
        style={{
          top: "-20%",
          left: "-28%",
          width: "22%",
          height: "140%",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,225,100,0.10) 50%, transparent 100%)",
          transform: "skewX(-18deg)",
        }}
      />
    </div>
  );
}
