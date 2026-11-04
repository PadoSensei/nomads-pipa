"use client";

import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function HeaderNavLinks() {
  const pathname = usePathname();
  const t = useTranslations("Navigation");

  const navLinks = [
    { href: "/", label: t("explore") },
    { href: "/categories", label: t("categories") },
    { href: "/events", label: t("events") },
    { href: "/community", label: t("community") },
    { href: "/about", label: t("about") },
  ];

  return (
    <nav
      aria-label="Desktop primary navigation"
      className="hidden items-center gap-1 md:flex"
    >
      {navLinks.map((link) => {
        const isActive =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isActive
                ? "bg-secondary text-primary font-semibold shadow-xs"
                : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
