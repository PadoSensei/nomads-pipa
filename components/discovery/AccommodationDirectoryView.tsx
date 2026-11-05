"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { FilterChips } from "@/components/ui/FilterChips";
import { DirectoryCard } from "@/components/ui/DirectoryCard";
import { ACCOMMODATION_FIXTURES } from "@/lib/content/accommodation-fixtures";
import { useTranslations } from "next-intl";
import { Info } from "lucide-react";

export function AccommodationDirectoryView() {
  const tDir = useTranslations("Directory");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filterOptions = [
    { id: "all", label: tDir("filterAll") },
    { id: "houses", label: tDir("filterHouses") },
    { id: "hostels", label: tDir("filterHostels") },
    { id: "real-estate", label: tDir("filterRealEstate") },
  ];

  const filteredItems = ACCOMMODATION_FIXTURES.filter((item) => {
    if (selectedFilter === "all") return true;
    return item.type === selectedFilter;
  });

  return (
    <div className="min-h-screen bg-sand pb-24">
      {/* Top Navigation Bar */}
      <TopBar title="Accommodation" backHref="/categories" />

      <main className="container mx-auto max-w-md px-4 pt-4 space-y-4">
        {/* Heading & Disclaimer Banner */}
        <div className="space-y-2">
          <h2 className="font-heading font-bold text-xl text-charcoal">
            Find your place in Pipa
          </h2>
          <div className="flex items-start gap-2.5 rounded-2xl bg-card/80 p-3.5 border border-border/70 text-xs text-muted-foreground leading-relaxed">
            <Info className="h-4 w-4 text-lagoon shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-charcoal">
                {tDir("disclaimerTitle")}
              </p>
              <p>{tDir("disclaimer")}</p>
            </div>
          </div>
        </div>

        {/* Filter Chips */}
        <FilterChips
          options={filterOptions}
          selectedId={selectedFilter}
          onSelect={setSelectedFilter}
        />

        {/* Directory List Rows */}
        <div className="space-y-3 pt-2">
          {filteredItems.map((item) => (
            <DirectoryCard
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              typeLabel={item.typeLabel}
              contactUrl={item.contactUrl}
              tint={item.tint}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
