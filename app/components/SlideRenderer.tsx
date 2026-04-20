import React from "react";
import type { Slide } from "../lib/slides";
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
  switch (slide.type) {
    case "banner":
      return (
        <BannerSlide
          image={slide.images[0]}
          active={active}
          caption={slide.caption}
        />
      );
    case "two":
      return (
        <TwoImageSlide
          images={slide.images}
          active={active}
          caption={slide.caption}
        />
      );
    case "three":
      return (
        <ThreeImageSlide
          images={slide.images}
          active={active}
          caption={slide.caption}
        />
      );
    case "four":
      return <FourImageSlide images={slide.images} active={active} />;
    default:
      return null;
  }
}
