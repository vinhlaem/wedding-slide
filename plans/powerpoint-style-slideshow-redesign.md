# Wedding Slideshow - PowerPoint-Style Redesign Plan

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     WEDDING ECOSYSTEM                        │
│                                                             │
│  ┌──────────────────┐     ┌──────────────────┐             │
│  │  BACKEND         │     │  WEDDING DASHBOARD│            │
│  │  (Express.js)    │◄───►│  (React + Vite)   │            │
│  │                  │     │  - Slide Manager  │            │
│  │  /api/slides     │     │  - Media Upload   │            │
│  │  /api/media      │     │  - Style Config   │            │
│  └────────┬─────────┘     └──────────────────┘             │
│           │                                                 │
│           │ GET /api/slides                                 │
│           ▼                                                 │
│  ┌──────────────────────────────────────────────────┐      │
│  │  WEDDING SLIDESHOW (Next.js)                     │      │
│  │  - Chỉ gọi GET /api/slides                       │      │
│  │  - Full-screen PowerPoint-style presentation     │      │
│  │  - Auto-play, no controls                        │      │
│  └──────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. PowerPoint-Style UI/UX Design

### 2.1 Core Principles

Giống hệt một slide trình chiếu PowerPoint:

| PowerPoint Feature  | Slideshow Implementation          |
| ------------------- | --------------------------------- |
| Full-screen slide   | `h-screen w-full overflow-hidden` |
| Auto-advance        | Random 5-7s delay                 |
| Smooth transition   | Fade crossfade 800ms              |
| Ken Burns on photos | Scale + translate animation       |
| Title overlay       | Caption text với elegant fonts    |
| No UI chrome        | Không controls, không buttons     |

### 2.2 Slide Container — Full Screen Frame

**Mục tiêu**: Mỗi slide chiếm 100% viewport, không scroll, không border.

```html
<div class="relative w-full h-screen bg-[#0a0a0a] overflow-hidden">
  <!-- Slide content here -->
</div>
```

**Key changes từ current:**

- Background: `bg-[#0a0a0a]` (đen như PowerPoint khi trình chiếu)
- Thêm `select-none` để tránh highlight text khi click
- Thêm `cursor-none` để ẩn cursor

### 2.3 Slide Transition — PowerPoint-Style

**Current**: Fade transition (opacity crossfade) — OK, giữ nguyên.

**Enhancement**: Thêm **cinematic entrance** cho slide mới:

- Slide active: fade-in từ opacity 0 → 1 (800ms)
- Slide inactive: fade-out từ opacity 1 → 0 (800ms)
- Thêm `z-index` management: active slide `z-30`, inactive `z-10`

```css
/* Transition class */
.slide-enter {
  animation: slideFadeIn 0.8s ease-in-out forwards;
}

.slide-exit {
  animation: slideFadeOut 0.8s ease-in-out forwards;
}

@keyframes slideFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideFadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
```

### 2.4 Photo Effects — PowerPoint + Cinematic

**Current effects**:

- Ken Burns (scale 1→1.06, translateY 0→-4%)
- Sun ray overlay
- Gradient overlays

**PowerPoint-style enhancements:**

| Effect       | Current     | Enhancement                                 |
| ------------ | ----------- | ------------------------------------------- |
| Ken Burns    | ✅ 8s       | Giữ nguyên, nhưng thêm subtle shadow border |
| Sun Ray      | ✅ 5s sweep | Giữ nguyên, giảm opacity để tinh tế hơn     |
| Photo border | ❌          | Thêm subtle inner shadow cho depth          |
| Vignette     | ❌          | Thêm subtle dark vignette ở edges           |

**Vignette effect** (PowerPoint-style):

```css
.vignette::after {
  content: "";
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.3);
  pointer-events: none;
}
```

**Inner shadow for depth**:

```css
.photo-depth {
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
}
```

---

## 3. Slide Layouts — PowerPoint-Style

### 3.1 Banner Slide — Title Slide

**PowerPoint equivalent**: Title slide (slide đầu tiên)

```
┌────────────────────────────────────────┐
│                                        │
│                                        │
│         [ Full-screen Photo ]           │
│                                        │
│                                        │
│   [Caption: "Đình Vinh & Minh Nguyệt"]  │
│                                        │
└────────────────────────────────────────┘
```

**Layout**:

- Ảnh full-screen với Ken Burns
- Caption: bottom-center (không phải bottom-left như hiện tại)
- Font: Great Vibes (script), màu trắng với text-shadow
- Background gradient: bottom darkening để caption dễ đọc

**Changes từ current:**

- Caption position: `bottom-12 left-1/2 -translate-x-1/2` (center)
- Caption color: `text-white` với `drop-shadow`
- Thêm subtitle line (date) nếu có

### 3.2 Two Image Slide — Two Content

**PowerPoint equivalent**: Two Content layout

```
┌────────────────────────────────────────┐
│          [img1]    [caption]   [img2]   │
│          2fr        1.5fr     2fr       │
└────────────────────────────────────────┘
```

**Layout**:

- Grid: `grid-cols-[2fr_1.5fr_2fr]` (giữ nguyên)
- Caption card: cream background `#faf8f4`, centered
- Ảnh: full-height, object-cover

**Changes từ current:**

- Thêm subtle shadow cho caption card
- Thêm decorative divider line trên/off caption
- Ảnh có inner shadow cho depth

### 3.3 Three Image Slide — Three Content

**PowerPoint equivalent**: Three Content layout

```
┌──────────────────────────────────────────────────┐
│  [img1]     [caption]     [img2 large]           │
│  (stacked)   (middle)      (spans 2 cols)        │
│  [img3]                                     [    ]│
└──────────────────────────────────────────────────┘
```

**Layout**:

- Grid: `grid-cols-[1fr_0.8fr_2fr]` (giữ nguyên)
- Left column: 2 ảnh stacked + caption middle
- Right column: 1 ảnh lớn

**Changes từ current:**

- Thêm gap giữa các ảnh (4px)
- Ảnh có rounded corners (2px)
- Caption: elegant typography, centered

### 3.4 Four Image Slide — Four Content

**PowerPoint equivalent**: Four Content layout

```
┌──────────────────────────────────────────────────┐
│  [img1 tall]  [img2]        [img4 tall]          │
│               [img3]                                │
└──────────────────────────────────────────────────┘
```

**Layout**:

- Grid: 3 cột x 2 hàng (giữ nguyên)
- Left/Right: ảnh tall (spans 2 rows)
- Center: 2 ảnh stacked

**Changes từ current:**

- Thêm subtle border giữa các ảnh
- Uniform spacing (2px gap)

---

## 4. Typography — PowerPoint Elegance

### 4.1 Font Choices

| Element       | Font                     | Weight  | Size    |
| ------------- | ------------------------ | ------- | ------- |
| Title/Caption | Great Vibes (script)     | 400     | 3xl-5xl |
| Body text     | Playfair Display (serif) | 400-600 | base-xl |
| Labels        | System sans-serif        | 400     | xs-sm   |

### 4.2 Caption Styling

**Banner slide caption**:

```css
.caption-title {
  font-family: "Great Vibes", cursive;
  font-size: 3rem;
  color: white;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.02em;
}
```

**Content slide caption**:

```css
.caption-card {
  background: #faf8f4;
  color: #5c4a3a;
  padding: 2rem;
  border-radius: 2px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}
```

---

## 5. Color Palette — Wedding Elegant

| Token         | Color                   | Usage                |
| ------------- | ----------------------- | -------------------- |
| Background    | `#0a0a0a`               | Slideshow background |
| Caption text  | `#5c4a3a`               | Warm brown           |
| Accent gold   | `#c9a96e`               | Decorative elements  |
| Card bg       | `#faf8f4`               | Cream caption card   |
| White overlay | `rgba(255,255,255,0.9)` | Light text           |
| Dark overlay  | `rgba(0,0,0,0.4)`       | Photo darkening      |

---

## 6. Animation Timing — PowerPoint Smooth

### 6.1 Transition Durations

| Animation      | Duration | Easing       |
| -------------- | -------- | ------------ |
| Slide fade     | 800ms    | ease-in-out  |
| Ken Burns      | 8s       | ease-in-out  |
| Sun ray        | 5s       | cubic-bezier |
| Photo entrance | 1s       | ease-out     |

### 6.2 Auto-play Timing

- **Delay**: Random 5-7 giây (organic feel)
- **Loop**: Tự động từ slide cuối về slide đầu
- **Pause**: Không có (PowerPoint-style continuous play)

---

## 7. Implementation Details

### 7.1 New File: `app/lib/api.ts`

```typescript
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
```

### 7.2 Modified: `app/components/SlideShow.tsx`

**Key changes:**

1. Fix env variable handling
2. Remove `any` types
3. Use typed `Slide` from API
4. Filter published, sort by order
5. Fix auto-play with `useCallback`
6. Background: `bg-[#0a0a0a]`

```typescript
// Before (current)
const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}slides`);
const data = await res.json();
if (mounted && Array.isArray(data.data) && data.data.length > 0) {
  setSlides(data.data.map((s: any) => ({ ... })));
}

// After (PowerPoint-style)
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";
const res = await fetch(`${API_BASE}/api/slides`);
const { data } = await res.json();
const fetchedSlides = (data as Slide[])
  .filter(s => s.published)
  .sort((a, b) => a.order - b.order);
setSlides(fetchedSlides);
```

### 7.3 Modified: `app/globals.css`

**Add vignette effect:**

```css
@layer utilities {
  .vignette::after {
    content: "";
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.3);
    pointer-events: none;
  }

  .photo-depth {
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  }
}
```

**Enhance caption styling:**

```css
@layer utilities {
  .caption-title {
    font-family: var(--font-great-vibes), cursive;
    font-size: 3rem;
    color: white;
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
  }

  .caption-card {
    background: #faf8f4;
    color: #5c4a3a;
    padding: 2rem;
    border-radius: 2px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }
}
```

### 7.4 Modified: `app/components/BannerSlide.tsx`

**Changes:**

- Caption position: center-bottom
- Caption color: white với text-shadow
- Thêm vignette overlay

```typescript
// Caption: bottom-center, white
<div className="absolute left-1/2 bottom-12 -translate-x-1/2 text-center">
  <h2 className="caption-title">{caption}</h2>
</div>
```

### 7.5 Modified: `app/components/TwoImageSlide.tsx`

**Changes:**

- Caption card: thêm shadow, border-radius
- Ảnh: thêm inner shadow

```typescript
// Caption card
<div className="flex flex-col items-center justify-center bg-[#faf8f4] shadow-lg">
  <h2 className="font-great-vibes text-4xl text-[#5c4a3a]">{caption}</h2>
</div>

// Ảnh
<img className="photo-depth ..." />
```

### 7.6 Modified: `app/components/ThreeImageSlide.tsx`

**Changes:**

- Thêm gap giữa các ảnh
- Caption: elegant typography

### 7.7 Modified: `app/components/FourImageSlide.tsx`

**Changes:**

- Thêm subtle border giữa các ảnh
- Uniform spacing

### 7.8 New File: `.env.local`

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

---

## 8. File Changes Summary

### New Files

| File             | Purpose                       |
| ---------------- | ----------------------------- |
| `app/lib/api.ts` | API client with `getSlides()` |
| `.env.local`     | Backend URL (gitignored)      |

### Modified Files

| File                                 | Changes                               |
| ------------------------------------ | ------------------------------------- |
| `app/components/SlideShow.tsx`       | Fix types, API, auto-play, bg color   |
| `app/components/BannerSlide.tsx`     | Caption center, vignette, white text  |
| `app/components/TwoImageSlide.tsx`   | Caption card shadow, photo depth      |
| `app/components/ThreeImageSlide.tsx` | Gap, caption typography               |
| `app/components/FourImageSlide.tsx`  | Border, spacing                       |
| `app/components/SlideRenderer.tsx`   | Handle `caption: null`                |
| `app/globals.css`                    | Vignette, caption styles, photo-depth |
| `app/lib/slides.ts`                  | Update types, fallback                |

---

## 9. Visual Comparison

### Before (Current)

```
┌────────────────────────────────┐
│                                │
│    [Photo with Ken Burns]      │
│                                │
│  Caption (bottom-left, brown)  │  ← Left-aligned, brown
└────────────────────────────────┘
```

### After (PowerPoint-Style)

```
┌────────────────────────────────┐
│                                │
│    [Photo with Ken Burns]      │
│       + vignette overlay       │
│                                │
│     Caption (center, white)    │  ← Centered, white, shadow
│     "Đình Vinh & Minh Nguyệt"   │
└────────────────────────────────┘
```

---

## 10. Implementation Steps

1. **Create `app/lib/api.ts`** — API client, Slide type
2. **Update `app/globals.css`** — Vignette, caption styles, photo-depth
3. **Update `SlideShow.tsx`** — Fix types, API, auto-play, bg color
4. **Update `BannerSlide.tsx`** — Caption center, vignette
5. **Update `TwoImageSlide.tsx`** — Caption card shadow, photo depth
6. **Update `ThreeImageSlide.tsx`** — Gap, caption typography
7. **Update `FourImageSlide.tsx`** — Border, spacing
8. **Update `SlideRenderer.tsx`** — Handle `caption: null`
9. **Create `.env.local`** — Backend URL
10. **Test** — Verify UI matches PowerPoint-style

---

## 11. Design Principles

1. **PowerPoint-like**: Full-screen, auto-play, no controls
2. **Elegant typography**: Great Vibes for captions, Playfair for body
3. **Subtle effects**: Vignette, inner shadow, smooth transitions
4. **Warm color palette**: Cream, gold, warm brown
5. **Graceful fallback**: Default slides if backend unavailable
