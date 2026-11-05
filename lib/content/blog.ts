export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: "move-to-pipa" | "lifestyle" | "guides";
  readMinutes: number;
  imageUrl: string;
}

export const BLOG_FIXTURES: BlogPost[] = [
  {
    id: "blog-1",
    slug: "digital-nomad-guide-to-pipa",
    title: "The Digital Nomad Guide to Pipa",
    category: "move-to-pipa",
    readMinutes: 7,
    imageUrl: "/images/about.webp",
  },
  {
    id: "blog-2",
    slug: "finding-long-term-stays-and-rentals",
    title: "Finding Long-Term Stays & Rentals",
    category: "move-to-pipa",
    readMinutes: 5,
    imageUrl: "/images/stay1.webp",
  },
  {
    id: "blog-3",
    slug: "where-to-work-best-cafes-and-workspaces",
    title: "Where to Work: Best Cafés & Workspaces",
    category: "guides",
    readMinutes: 6,
    imageUrl: "/images/food1.webp",
  },
  {
    id: "blog-4",
    slug: "day-in-pipa-surf-work-sunset-vibe",
    title: "A Day in Pipa: Surf, Work & Sunset Vibe",
    category: "lifestyle",
    readMinutes: 4,
    imageUrl: "/images/community.webp",
  },
];
