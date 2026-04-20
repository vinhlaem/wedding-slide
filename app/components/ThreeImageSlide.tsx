import React from "react";
import SunRayOverlay from "./SunRayOverlay";

export default function ThreeImageSlide({
  images,
  active,
  caption,
}: {
  images: string[];
  active: boolean;
  caption?: string | null;
}) {
  // Layout: left column = two stacked images (images[0], images[1])
  // right column = large image (images[2])
  // when `caption` is present, show centered caption card in the middle column
  return (
    <div className="w-full h-screen grid grid-cols-[1fr_0.8fr_2fr] gap-2">
      <div className="col-span-1 grid grid-rows-[1fr_auto_1fr] gap-2 h-full">
        <div className="relative overflow-hidden rounded-lg min-h-0">
          <img
            src={images[0]}
            alt="left-top"
            className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out ${active ? "animate-slideUp" : "opacity-80"}`}
            style={{ willChange: "transform, opacity" }}
          />
        </div>
        {/* middle row: caption card (only when caption exists) */}
        <div className="flex items-center justify-center px-2">
          {caption ? (
            <div className="relative z-10">
              <p className="text-4xl text-[#5c4a3a] leading-relaxed font-great-vibes">
                {caption}
              </p>
            </div>
          ) : (
            <div className="w-full h-full" />
          )}
        </div>
        <div className="relative overflow-hidden rounded-lg min-h-0">
          <img
            src={images[1]}
            alt="left-bottom"
            className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out ${active ? "animate-slideDown" : "opacity-80"}`}
            style={{ willChange: "transform, opacity" }}
          />
        </div>
      </div>

      <div className="col-span-2 relative overflow-hidden rounded-lg h-full">
        <img
          src={images[2]}
          alt="right"
          className={`w-full h-full object-cover object-center transition-transform duration-900 ease-out ${active ? "animate-kenburns" : "opacity-80"}`}
          style={{ willChange: "transform, opacity" }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent" />
        <SunRayOverlay active={active} />
      </div>
    </div>
  );
}
