"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";

import { BooknookLogo } from "@/components/booknook-logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { authLinks, navLinks } from "@/lib/site";
import { cn } from "cn";

/** A link is active when the pathname matches it exactly or is a child of it. */
function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const desktopLinkClass =
  "group relative px-3 py-2 text-[0.78rem] font-semibold tracking-[0.14em] uppercase outline-none transition-colors duration-200 focus-visible:ring-3 focus-visible:ring-brown/60";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  // Collapse the mobile menu on Escape, without needing an effect.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (open && event.key === "Escape") setOpen(false);
  };

  // Collapse the mobile menu after navigating.
  const closeMenu = () => setOpen(false);

  return (
    <header
      onKeyDown={handleKeyDown}
      className="sticky top-0 z-50 border-b border-charcoal/10 bg-cream/90 backdrop-blur-md supports-[backdrop-filter]:bg-cream/75"
    >
      <div className="mx-auto flex h-[4.75rem] w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          aria-label="BookNook — home"
          className="shrink-0 rounded-2xl outline-none focus-visible:ring-3 focus-visible:ring-brown/60"
        >
          <BooknookLogo />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-0.5 lg:flex"
        >
          {navLinks.map((link) => {
            const active = isCurrent(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  desktopLinkClass,
                  active
                    ? "text-charcoal"
                    : "text-charcoal/60 hover:text-charcoal",
                )}
              >
                {link.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-3 bottom-0.5 h-[2px] origin-center rounded-full bg-brown transition-transform duration-300 ease-out",
                    active
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href={authLinks.signIn.href}
            className={cn(
              buttonVariants({ variant: "ghost", size: "lg" }),
              "h-10 rounded-full border border-charcoal/20 px-5 text-[0.76rem] font-semibold tracking-[0.14em] text-charcoal uppercase transition-colors hover:border-charcoal hover:bg-charcoal hover:text-cream focus-visible:ring-brown/60",
            )}
          >
            {authLinks.signIn.label}
          </Link>
          <Link
            href={authLinks.signUp.href}
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-10 rounded-full bg-charcoal px-5 text-[0.76rem] font-semibold tracking-[0.14em] text-cream uppercase transition-colors hover:bg-brown hover:text-charcoal focus-visible:ring-brown/60",
            )}
          >
            {authLinks.signUp.label}
          </Link>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="size-11 shrink-0 rounded-full border border-charcoal/20 text-charcoal transition-colors hover:border-charcoal hover:bg-charcoal hover:text-cream focus-visible:ring-brown/60 lg:hidden"
        >
          {open ? (
            <X className="size-5" aria-hidden />
          ) : (
            <Menu className="size-5" aria-hidden />
          )}
        </Button>
      </div>

      {/* Mobile menu — collapses smoothly via animated grid rows. */}
      <div
        id="mobile-menu"
        inert={!open}
        className={cn(
          "grid overflow-hidden border-t border-charcoal/10 bg-cream transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0">
          <nav
            aria-label="Mobile"
            className="mx-auto flex max-w-7xl flex-col px-5 pt-3 sm:px-8"
          >
            {navLinks.map((link) => {
              const active = isCurrent(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={closeMenu}
                  className={cn(
                    "group flex items-center justify-between border-b border-charcoal/10 py-3.5 text-[0.8rem] font-semibold tracking-[0.18em] uppercase outline-none transition-colors focus-visible:ring-3 focus-visible:ring-brown/60",
                    active
                      ? "text-charcoal"
                      : "text-charcoal/60 hover:text-charcoal",
                  )}
                >
                  <span>{link.label}</span>
                  <ArrowRight
                    aria-hidden
                    className={cn(
                      "size-4 text-brown transition-all duration-300 group-hover:translate-x-1",
                      active
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-5 pt-6 pb-6 sm:px-8">
            <Link
              href={authLinks.signIn.href}
              onClick={closeMenu}
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "h-11 w-full rounded-full border border-charcoal/20 text-[0.76rem] font-semibold tracking-[0.14em] text-charcoal uppercase transition-colors hover:border-charcoal hover:bg-charcoal hover:text-cream focus-visible:ring-brown/60",
              )}
            >
              {authLinks.signIn.label}
            </Link>
            <Link
              href={authLinks.signUp.href}
              onClick={closeMenu}
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 w-full rounded-full bg-charcoal text-[0.76rem] font-semibold tracking-[0.14em] text-cream uppercase transition-colors hover:bg-brown hover:text-charcoal focus-visible:ring-brown/60",
              )}
            >
              {authLinks.signUp.label}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
