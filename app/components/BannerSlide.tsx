import React from "react";
import SunRayOverlay from "./SunRayOverlay";

export default function BannerSlide({
  image,
  active,
  caption,
}: {
  image: string;
  active: boolean;
  caption?: string;
}) {
  return (
    <div className="w-full h-screen relative overflow-hidden">
      <img
        src={image}
        alt={caption ?? "banner"}
        className={`w-full h-full object-cover transform transition-transform duration-1000 ease-out ${
          active ? "animate-kenburns" : ""
        }`}
        style={{ willChange: "transform, opacity" }}
      />

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/25 pointer-events-none" />

      <SunRayOverlay active={active} />

      {caption && (
        <div className="absolute left-1/2 bottom-12 -translate-x-1/2 text-center">
          <h2 className="caption-title">{caption}</h2>
        </div>
      )}
    </div>
  );
}
