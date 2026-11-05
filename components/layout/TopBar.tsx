"use client";

import { useRouter } from "@/i18n/navigation";
import { ChevronLeft, SlidersHorizontal } from "lucide-react";

interface TopBarProps {
  title: string;
  backHref?: string;
  onFilterClick?: () => void;
  showFilter?: boolean;
}

export function TopBar({
  title,
  backHref,
  onFilterClick,
  showFilter = true,
}: TopBarProps) {
  const router = useRouter();

  const handleBack = () => {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  return (
    <header className="sticky top-0 z-20 flex h-14 w-full items-center justify-between border-b border-border/40 bg-sand/90 px-4 backdrop-blur-md">
      <button
        type="button"
        onClick={handleBack}
        aria-label="Go back"
        className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal hover:bg-mist/60 focus:outline-hidden focus:ring-2 focus:ring-lagoon min-h-[44px] min-w-[44px]"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <h1 className="font-heading font-bold text-base text-charcoal truncate max-w-[200px] text-center">
        {title}
      </h1>

      {showFilter ? (
        <button
          type="button"
          onClick={onFilterClick}
          aria-label="Filter"
          className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal hover:bg-mist/60 focus:outline-hidden focus:ring-2 focus:ring-lagoon min-h-[44px] min-w-[44px]"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </button>
      ) : (
        <div className="w-10" />
      )}
    </header>
  );
}
