"use client";

interface FilterOption {
  id: string;
  label: string;
}

interface FilterChipsProps {
  options: FilterOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export function FilterChips({
  options,
  selectedId,
  onSelect,
  className = "",
}: FilterChipsProps) {
  return (
    <div
      role="group"
      aria-label="Filter options"
      className={`flex items-center gap-2 overflow-x-auto no-scrollbar py-1 ${className}`}
    >
      {options.map((option) => {
        const isSelected = option.id === selectedId;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelect(option.id)}
            className={`shrink-0 rounded-full px-5 py-2 text-xs font-semibold transition-all focus:outline-hidden focus:ring-2 focus:ring-lagoon min-h-[44px] ${
              isSelected
                ? "bg-ocean text-white shadow-xs"
                : "bg-card border border-border/70 text-charcoal hover:border-ocean/40"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
