import React from "react";
import type { Slide } from "../lib/api";
import BannerSlide from "./BannerSlide";
import TwoImageSlide from "./TwoImageSlide";
import ThreeImageSlide from "./ThreeImageSlide";
import FourImageSlide from "./FourImageSlide";

export default function SlideRenderer({
  slide,
  active,
}: {
  slide: Slide;
  active: boolean;
}) {
  const caption = slide.caption || undefined;

  switch (slide.type) {
    case "banner":
      return (
        <BannerSlide
          image={slide.images[0]}
          active={active}
          caption={caption}
        />
      );
    case "two":
      return (
        <TwoImageSlide
          images={slide.images}
          active={active}
          caption={caption}
        />
      );
    case "three":
      return (
        <ThreeImageSlide
          images={slide.images}
          active={active}
          caption={caption}
        />
      );
    case "four":
      return <FourImageSlide images={slide.images} active={active} />;
    default:
      return null;
  }
}
