"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Compass, Grid3X3, CalendarDays, Users, Info } from "lucide-react";

export function MobileNavContent() {
  const pathname = usePathname();
  const tNav = useTranslations("Navigation");

  // Production approved 5-tab mobile navigation:
  // 1. Explore -> /
  // 2. Categories -> /categories
  // 3. Events -> /events
  // 4. Community -> /community
  // 5. About -> /about
  const navItems = [
    { href: "/", label: tNav("explore"), icon: Compass },
    { href: "/categories", label: tNav("categories"), icon: Grid3X3 },
    { href: "/events", label: tNav("events"), icon: CalendarDays },
    { href: "/community", label: tNav("community"), icon: Users },
    { href: "/about", label: tNav("about"), icon: Info },
  ];

  return (
    <nav
      aria-label="Mobile bottom navigation"
      className="flex h-16 w-full items-center justify-around px-2 pb-[env(safe-area-inset-bottom)]"
    >
      {navItems.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/" || pathname === ""
            : pathname.startsWith(item.href);

        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`flex flex-col items-center justify-center gap-1 min-h-[48px] min-w-[48px] px-2 py-1 text-[11px] font-medium transition-colors focus:outline-hidden focus:ring-2 focus:ring-lagoon rounded-lg ${
              isActive
                ? "text-ocean font-bold"
                : "text-charcoal/60 hover:text-charcoal"
            }`}
          >
            <div
              className={`flex h-8 w-12 items-center justify-center rounded-full transition-colors ${
                isActive ? "bg-mist/80 text-ocean" : "text-charcoal/60"
              }`}
            >
              <Icon className="h-4 w-4" />
            </div>
            <span className="truncate max-w-[56px] text-center">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
