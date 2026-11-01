import { BookOpen } from "lucide-react";
import { cn } from "cn";

import { siteInfo } from "@/lib/site";

type BooknookLogoProps = {
  /**
   * `dark` is for light surfaces (Navbar), `light` is for dark surfaces (Footer).
   */
  tone?: "dark" | "light";
  className?: string;
};

/**
 * BookNook wordmark: a book mark paired with a serif logotype.
 * Reused by both the Navbar and the Footer.
 */
export function BooknookLogo({
  tone = "dark",
  className,
}: BooknookLogoProps) {
  const onDark = tone === "light";

  return (
    <span className={cn("group inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "relative inline-flex size-11 shrink-0 items-center justify-center rounded-2xl shadow-[0_8px_20px_-10px_rgba(37,35,31,0.65)] transition-transform duration-300 ease-out group-hover:-translate-y-0.5",
          onDark ? "bg-cream" : "bg-charcoal",
        )}
      >
        <BookOpen
          className={cn("size-[22px]", onDark ? "text-charcoal" : "text-cream")}
          strokeWidth={1.6}
          aria-hidden
        />
        <span
          aria-hidden
          className={cn(
            "absolute -right-1 -top-1 size-2.5 rounded-full bg-brown ring-2",
            onDark ? "ring-charcoal" : "ring-cream",
          )}
        />
      </span>

      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.55rem] leading-none font-semibold tracking-tight">
          <span className={onDark ? "text-cream" : "text-charcoal"}>Book</span>
          <span className="text-brown">Nook</span>
        </span>
        <span
          className={cn(
            "mt-1.5 text-[0.58rem] font-semibold tracking-[0.4em] uppercase",
            onDark ? "text-cream/50" : "text-brown-deep",
          )}
        >
          {siteInfo.tagline}
        </span>
      </span>
    </span>
  );
}
