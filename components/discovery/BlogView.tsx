"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { FilterChips } from "@/components/ui/FilterChips";
import { MediaListRow } from "@/components/ui/MediaListRow";
import { BLOG_FIXTURES } from "@/lib/content/blog";
import { useTranslations } from "next-intl";

export function BlogView() {
  const tBlog = useTranslations("Blog");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filterOptions = [
    { id: "all", label: tBlog("filterAll") },
    { id: "move-to-pipa", label: tBlog("filterMoveToPipa") },
    { id: "lifestyle", label: tBlog("filterLifestyle") },
    { id: "guides", label: tBlog("filterGuides") },
  ];

  const categoryLabels: Record<string, string> = {
    "move-to-pipa": tBlog("filterMoveToPipa"),
    lifestyle: tBlog("filterLifestyle"),
    guides: tBlog("filterGuides"),
  };

  const filteredPosts = BLOG_FIXTURES.filter((post) => {
    if (selectedFilter === "all") return true;
    return post.category === selectedFilter;
  });

  return (
    <div className="min-h-screen bg-sand pb-24">
      <TopBar title={tBlog("title")} backHref="/" />

      <main className="container mx-auto max-w-md px-4 pt-4 space-y-4">
        <p className="text-xs text-muted-foreground">
          Editorial foundation · Sample articles for review
        </p>

        {/* Category Chips */}
        <FilterChips
          options={filterOptions}
          selectedId={selectedFilter}
          onSelect={setSelectedFilter}
        />

        {/* Blog Row List */}
        <div className="space-y-3 pt-2">
          {filteredPosts.map((post) => (
            <MediaListRow
              key={post.id}
              id={post.id}
              slug={post.slug}
              title={post.title}
              categoryLabel={categoryLabels[post.category] || post.category}
              readMinutes={post.readMinutes}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
