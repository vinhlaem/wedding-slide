import React from "react";
import SunRayOverlay from "./SunRayOverlay";

export default function TwoImageSlide({
  images,
  active,
  caption,
}: {
  images: string[];
  active: boolean;
  caption?: string;
}) {
  if (caption) {
    // Layout: [img] | [caption card] | [img]
    return (
      <div
        className="w-full h-screen"
        style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 2fr" }}
      >
        {/* Left image */}
        <div className="relative overflow-hidden">
          <img
            src={images[0]}
            alt="left"
            className={`w-full h-full object-cover photo-depth ${
              active ? "animate-slideUp" : "opacity-0"
            }`}
            style={{ willChange: "transform, opacity" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
          <SunRayOverlay active={active} />
        </div>

        {/* Caption in the middle */}
        <div className="flex flex-col items-center justify-center bg-[#faf8f4] caption-card">
          <h2
            className="font-great-vibes text-4xl text-center leading-snug"
            style={{ color: "#5c4a3a" }}
          >
            {caption}
          </h2>
          <div
            className="mt-3 flex gap-1 text-base"
            style={{ color: "#c9a96e" }}
          >
            <span>◆</span>
            <span>◈</span>
            <span>◆</span>
          </div>
        </div>

        {/* Right image */}
        <div className="relative overflow-hidden">
          <img
            src={images[1]}
            alt="right"
            className={`w-full h-full object-cover photo-depth ${
              active ? "animate-slideDown" : "opacity-0"
            }`}
            style={{ willChange: "transform, opacity" }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent" />
          <SunRayOverlay active={active} />
        </div>
      </div>
    );
  }

  // No caption: simple 2-col
  return (
    <div className="w-full h-screen grid grid-cols-2">
      <div className="relative overflow-hidden">
        <img
          src={images[0]}
          alt="left"
          className={`w-full h-full object-cover photo-depth ${active ? "animate-slideUp" : "opacity-0"}`}
          style={{ willChange: "transform, opacity" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 to-transparent" />
        <SunRayOverlay active={active} />
      </div>

      <div className="relative overflow-hidden">
        <img
          src={images[1]}
          alt="right"
          className={`w-full h-full object-cover photo-depth ${active ? "animate-slideDown" : "opacity-0"}`}
          style={{ willChange: "transform, opacity" }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/25 to-transparent" />
        <SunRayOverlay active={active} />
      </div>
    </div>
  );
}
