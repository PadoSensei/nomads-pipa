import { Link } from "@/i18n/navigation";
import { type LucideIcon } from "lucide-react";

interface QuickActionTileProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  href: string;
  tint: "mint" | "aqua" | "peach" | "yellow";
  iconColor?: string;
}

export function QuickActionTile({
  title,
  subtitle,
  icon: Icon,
  href,
  tint,
  iconColor,
}: QuickActionTileProps) {
  const tintClasses = {
    mint: "bg-[var(--color-tint-mint)] hover:brightness-95",
    aqua: "bg-[var(--color-tint-aqua)] hover:brightness-95",
    peach: "bg-[var(--color-tint-peach)] hover:brightness-95",
    yellow: "bg-[var(--color-tint-yellow)] hover:brightness-95",
  }[tint];

  const defaultIconColor = {
    mint: "text-ocean",
    aqua: "text-lagoon",
    peach: "text-coral",
    yellow: "text-[#D97706]",
  }[tint];

  return (
    <Link
      href={href}
      className={`group flex h-28 flex-col items-center justify-center rounded-2xl p-3 text-center transition-all active:scale-[0.98] focus:outline-hidden focus:ring-2 focus:ring-lagoon ${tintClasses}`}
    >
      <div className="mb-2 flex h-8 w-8 items-center justify-center">
        <Icon className={`h-6 w-6 ${iconColor || defaultIconColor}`} />
      </div>
      <span className="font-heading font-bold text-sm text-charcoal leading-tight">
        {title}
      </span>
      <span className="text-[11px] font-medium text-charcoal/70 leading-tight">
        {subtitle}
      </span>
    </Link>
  );
}
