/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef, useState } from "react";
import defaultSlides from "../lib/slides";
import SlideRenderer from "./SlideRenderer";

const MIN_DELAY = 5000;
const MAX_DELAY = 7000;

export default function Slideshow() {
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState(defaultSlides);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // fetch slides from backend; fallback to bundled defaultSlides
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}slides`,
        );
        if (!res.ok) throw new Error("fetch failed");
        const data = await res.json();
        if (mounted && Array.isArray(data.data) && data.data.length > 0) {
          // map backend shape to local format if needed
          setSlides(
            data.data.map((s: any) => ({
              type: s.type,
              images: s.images,
              caption: s.caption,
            })),
          );
        }
      } catch (e) {
        // keep defaultSlides on error
        console.warn("Could not fetch slides from backend, using defaults", e);
      }
    })();

    // schedule next slide with slight variance for organic feel
    const schedule = () => {
      const delay =
        MIN_DELAY + Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY));
      timeoutRef.current = window.setTimeout(() => {
        setIndex((i) => (i + 1) % (slides.length || 1));
      }, delay);
    };

    schedule();

    return () => {
      mounted = false;
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [index, slides.length]);

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden ">
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === index
              ? "opacity-100 z-20"
              : "opacity-0 z-10 pointer-events-none"
          }`}
        >
          <SlideRenderer slide={s} active={i === index} />
        </div>
      ))}

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-black/50" />
    </div>
  );
}
