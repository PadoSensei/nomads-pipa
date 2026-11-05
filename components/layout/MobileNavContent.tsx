"use client";

import { useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Home, Compass, Users, Bookmark, MoreHorizontal } from "lucide-react";
import { NavSheet } from "./NavSheet";

export function MobileNavContent() {
  const pathname = usePathname();
  const tNav = useTranslations("Navigation");
  const [isNavSheetOpen, setIsNavSheetOpen] = useState(false);

  const navItems = [
    { href: "/", label: tNav("home"), icon: Home },
    { href: "/categories", label: tNav("explore"), icon: Compass },
    { href: "/community", label: tNav("community"), icon: Users },
    { href: "/saved", label: tNav("saved"), icon: Bookmark },
  ];

  return (
    <>
      <div className="flex h-16 items-center justify-around px-2">
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
              <Icon className={`h-5 w-5 ${isActive ? "text-ocean" : "text-charcoal/60"}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* More Tab Button */}
        <button
          type="button"
          onClick={() => setIsNavSheetOpen(true)}
          aria-haspopup="dialog"
          aria-label={tNav("more")}
          className="flex flex-col items-center justify-center gap-1 min-h-[48px] min-w-[48px] px-2 py-1 text-[11px] font-medium text-charcoal/60 hover:text-charcoal transition-colors focus:outline-hidden focus:ring-2 focus:ring-lagoon rounded-lg"
        >
          <MoreHorizontal className="h-5 w-5 text-charcoal/60" />
          <span>{tNav("more")}</span>
        </button>
      </div>

      <NavSheet isOpen={isNavSheetOpen} onClose={() => setIsNavSheetOpen(false)} />
    </>
  );
}
