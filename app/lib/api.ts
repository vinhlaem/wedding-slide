// Types matching backend response
export interface Slide {
  _id: string;
  type: "banner" | "two" | "three" | "four";
  images: string[];
  caption: string | null;
  order: number;
  published: boolean;
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

export async function getSlides(): Promise<Slide[]> {
  const res = await fetch(`${API_BASE}/api/slides`);
  if (!res.ok) throw new Error("Failed to fetch slides");
  const { data } = await res.json();
  return (data as Slide[])
    .filter((s) => s.published)
    .sort((a, b) => a.order - b.order);
}
