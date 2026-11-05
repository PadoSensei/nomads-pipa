"use client";

import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Compass, LayoutGrid, CalendarDays, Users, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNavContent() {
  const pathname = usePathname();
  const t = useTranslations("Navigation");

  const mobileDestinations = [
    { href: "/", label: t("explore"), icon: Compass },
    { href: "/categories", label: t("categories"), icon: LayoutGrid },
    { href: "/events", label: t("events"), icon: CalendarDays },
    { href: "/community", label: t("community"), icon: Users },
    { href: "/about", label: t("about"), icon: Info },
  ];

  return (
    <nav
      aria-label="Mobile bottom navigation"
      className="fixed bottom-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-around border-t border-border/80 bg-background/95 px-2 backdrop-blur-lg supports-[backdrop-filter]:bg-background/85 md:hidden"
    >
      {mobileDestinations.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex flex-1 min-h-[48px] flex-col items-center justify-center gap-1 py-1 text-[11px] font-medium transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg",
              isActive
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <div
              className={cn(
                "flex h-8 w-12 items-center justify-center rounded-full transition-all",
                isActive ? "bg-secondary text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "stroke-[2.25]")} />
            </div>
            <span className="leading-none">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
