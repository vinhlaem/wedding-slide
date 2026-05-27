/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import type { Slide } from "../lib/api";
import defaultSlides from "../lib/slides";
import SlideRenderer from "./SlideRenderer";

const MIN_DELAY = 7000;
const MAX_DELAY = 7000;
const LOOP_PAUSE = 3000; // Extra pause when looping back to first slide

export default function Slideshow() {
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState<Slide[]>(
    defaultSlides as unknown as Slide[],
  );
  const timeoutRef = useRef<number | null>(null);
  const loopPauseRef = useRef<number | null>(null);

  const schedule = useCallback(
    (i: number) => {
      if (slides.length === 0) return;
      const delay =
        MIN_DELAY + Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY));
      timeoutRef.current = window.setTimeout(() => {
        const nextIndex = (i + 1) % slides.length;
        setIndex(nextIndex);
      }, delay);
    },
    [slides.length],
  );

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { getSlides } = await import("../lib/api");
        const fetched = await getSlides();
        if (mounted && fetched.length > 0) {
          setSlides(fetched);
        }
      } catch (e) {
        console.warn("Could not fetch slides from backend, using defaults", e);
      }
    })();

    schedule(index);

    return () => {
      mounted = false;
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      if (loopPauseRef.current) window.clearTimeout(loopPauseRef.current);
    };
  }, [schedule, index]);

  // Auto replay: when index reaches the last slide, pause then loop to 0
  useEffect(() => {
    if (index === slides.length - 1 && slides.length > 0) {
      loopPauseRef.current = window.setTimeout(() => {
        setIndex(0);
      }, LOOP_PAUSE);
    }
  }, [index, slides.length]);

  return (
    <div className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden select-none cursor-none">
      {slides.map((s, i) => (
        <div
          key={s._id || i}
          className={`absolute inset-0 transition-opacity duration-800 ease-in-out ${
            i === index
              ? "opacity-100 z-30"
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
