import React from "react";
import SunRayOverlay from "./SunRayOverlay";

/**
 * Gallery layout (like screenshot 3):
 * [ img1 tall left ] [ img2 top-center  ] [ img4 tall right ]
 *                    [ img3 bot-center  ]
 */
export default function FourImageSlide({
  images,
  active,
}: {
  images: string[];
  active: boolean;
}) {
  return (
    <div
      className="w-full h-screen"
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 2fr 2fr",
        gridTemplateRows: "1fr 1fr",
      }}
    >
      {/* Left tall image — spans both rows */}
      <div
        className="relative overflow-hidden"
        style={{ gridColumn: 1, gridRow: "1 / 3" }}
      >
        <img
          src={images[0]}
          alt="left"
          className={`w-full h-full object-cover object-center ${
            active ? "animate-slideUp" : "opacity-0"
          }`}
          style={{ willChange: "transform, opacity" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        <SunRayOverlay active={active} />
      </div>

      {/* Top-center image */}
      <div
        className="relative overflow-hidden"
        style={{ gridColumn: 2, gridRow: 1 }}
      >
        <img
          src={images[1]}
          alt="top-center"
          className={`w-full h-full object-cover object-center ${
            active ? "animate-slideDown" : "opacity-0"
          }`}
          style={{ willChange: "transform, opacity" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/15" />
        <SunRayOverlay active={active} />
      </div>

      {/* Bottom-center image */}
      <div
        className="relative overflow-hidden"
        style={{ gridColumn: 2, gridRow: 2 }}
      >
        <img
          src={images[2]}
          alt="bottom-center"
          className={`w-full h-full object-cover object-center ${
            active ? "animate-slideUp" : "opacity-0"
          }`}
          style={{ willChange: "transform, opacity" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/15" />
        <SunRayOverlay active={active} />
      </div>

      {/* Right tall image — spans both rows */}
      <div
        className="relative overflow-hidden"
        style={{ gridColumn: 3, gridRow: "1 / 3" }}
      >
        <img
          src={images[3]}
          alt="right"
          className={`w-full h-full object-cover object-center ${
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
