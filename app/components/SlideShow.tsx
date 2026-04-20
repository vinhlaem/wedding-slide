"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { image } from "framer-motion/client";

export default function Slideshow() {
  const [index, setIndex] = useState(0);

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}media?component=slide`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data) {
          const urls = data.data.map(
            (item: { imageUrl: string }) => item.imageUrl,
          );
          setImages(urls);
        } else {
          console.warn("No media data found in response:", data);
        }
      })
      .catch((err) => console.error("Error fetching images:", err));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [images?.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence>
        <motion.img
          key={index}
          src={images[index]}
          className="absolute w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 6, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Overlay ánh sáng */}
      <div className="absolute inset-0 bg-gradient-to-tr from-yellow-200/20 via-transparent to-pink-200/20" />

      {/* Text slide đầu */}
      {index === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <h1 className="text-6xl font-serif">Vinh & Nguyệt</h1>
          <p className="mt-4 text-xl">25.12.2026</p>
        </motion.div>
      )}
    </div>
  );
}
