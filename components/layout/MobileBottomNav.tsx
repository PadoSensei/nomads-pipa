import { Suspense } from "react";
import { MobileNavContent } from "./MobileNavContent";

export function MobileBottomNav() {
  return (
    <Suspense
      fallback={
        <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-around border-t border-border/80 bg-background/95 px-2 md:hidden" />
      }
    >
      <MobileNavContent />
    </Suspense>
  );
}
