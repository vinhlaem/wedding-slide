import type { Slide } from "./api";

// SlideType alias for compatibility
export type SlideType = Slide["type"];

// Sample slides — replace with real wedding images from `public/` when ready
const slides: Slide[] = [
  {
    _id: "default-1",
    type: "banner",
    images: [
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1600&q=80&auto=format&fit=crop",
    ],
    caption: "Together forever",
    order: 0,
    published: true,
  },
  {
    // Two images with caption in the middle
    _id: "default-2",
    type: "two",
    images: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&q=80&auto=format&fit=crop",
    ],
    caption: "Our Love Story",
    order: 1,
    published: true,
  },
  {
    // Three images with caption card (like screenshot 2)
    _id: "default-3",
    type: "three",
    images: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80&auto=format&fit=crop",
    ],
    caption: "A Beautiful Day",
    order: 2,
    published: true,
  },
  {
    // Four images gallery layout (like screenshot 3)
    _id: "default-4",
    type: "four",
    images: [
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=80&auto=format&fit=crop",
    ],
    caption: null,
    order: 3,
    published: true,
  },
  {
    // Three images no caption (like screenshot 1)
    _id: "default-5",
    type: "three",
    images: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80&auto=format&fit=crop",
    ],
    caption: null,
    order: 4,
    published: true,
  },
  {
    _id: "default-6",
    type: "banner",
    images: [
      "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=1600&q=80&auto=format&fit=crop",
    ],
    caption: "A Cinematic Day",
    order: 5,
    published: true,
  },
];

export default slides;
