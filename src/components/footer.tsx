import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { BooknookLogo } from "@/components/booknook-logo";
import { SocialLinks } from "@/components/social-links";
import { navLinks, siteInfo } from "@/lib/site";
import { cn } from "cn";

const columnTitleClass =
  "font-display text-lg font-semibold tracking-tight text-cream";

const footerLinkClass =
  "text-[0.93rem] text-cream/60 transition-colors duration-200 hover:text-brown focus-visible:ring-3 focus-visible:ring-brown/60 focus-visible:outline-none";

function FooterColumn({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className={columnTitleClass}>{title}</h2>
      <span
        aria-hidden
        className="mt-3 mb-5 block h-px w-10 bg-brown"
      />
      {children}
    </div>
  );
}

function ContactItem({
  icon: Icon,
  label,
  href,
  children,
}: {
  icon: LucideIcon;
  label: string;
  href?: string;
  children: ReactNode;
}) {
  const body = (
    <span className="flex items-start gap-3.5">
      <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-brown transition-colors duration-300 group-hover:border-brown group-hover:bg-brown group-hover:text-charcoal">
        <Icon className="size-4" aria-hidden strokeWidth={1.7} />
      </span>
      <span className="min-w-0">
        <span className="block text-[0.68rem] font-semibold tracking-[0.2em] text-cream/40 uppercase">
          {label}
        </span>
        <span
          className={cn(
            "mt-1 block break-words text-[0.93rem] leading-relaxed text-cream/75 transition-colors duration-200",
            href && "group-hover:text-brown",
          )}
        >
          {children}
        </span>
      </span>
    </span>
  );

  return (
    <li>
      {href ? (
        <a
          href={href}
          className="group block rounded-xl -mx-2 px-2 py-2 outline-none focus-visible:ring-3 focus-visible:ring-brown/60"
        >
          {body}
        </a>
      ) : (
        <div className="group -mx-2 rounded-xl px-2 py-2">{body}</div>
      )}
    </li>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-charcoal text-cream">
      {/* Soft brown hairline that separates the page from the footer */}
      <div
        aria-hidden
        className="h-px w-full bg-gradient-to-r from-transparent via-brown/70 to-transparent"
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:py-20">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-4">
          <Link
            href="/"
            aria-label="BookNook — home"
            className="inline-block rounded-2xl outline-none focus-visible:ring-3 focus-visible:ring-brown/60"
          >
            <BooknookLogo tone="light" />
          </Link>

          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-cream/60">
            {siteInfo.description}
          </p>

          <p className="mt-8 text-[0.68rem] font-semibold tracking-[0.2em] text-cream/40 uppercase">
            Follow the story
          </p>
          <SocialLinks className="mt-4" />
        </div>

        {/* Explore */}
        <FooterColumn title="Explore" className="lg:col-span-2">
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={footerLinkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </FooterColumn>

        {/* Contact */}
        <FooterColumn title="Contact" className="lg:col-span-3">
          <ul className="flex flex-col gap-1">
            <ContactItem icon={Mail} label="Email" href={`mailto:${siteInfo.email}`}>
              {siteInfo.email}
            </ContactItem>
            <ContactItem icon={Phone} label="Phone" href={siteInfo.phoneHref}>
              {siteInfo.phone}
            </ContactItem>
            <ContactItem icon={MapPin} label="Location">
              {siteInfo.address}
            </ContactItem>
          </ul>
        </FooterColumn>

        {/* Hours */}
        <FooterColumn title="Reading Hours" className="lg:col-span-3">
          <ul className="flex flex-col gap-3">
            {siteInfo.hours.map((slot) => (
              <li
                key={slot.days}
                className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-2.5 text-[0.93rem]"
              >
                <span className="text-cream/60">{slot.days}</span>
                <span className="font-medium text-cream tabular-nums">
                  {slot.time}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-5 flex items-center gap-2 text-[0.8rem] text-cream/45">
            <Clock className="size-3.5 shrink-0 text-brown" aria-hidden strokeWidth={1.8} />
            Closed on public holidays
          </p>
        </FooterColumn>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 sm:flex-row sm:px-8">
          <p className="text-sm text-cream/55">{siteInfo.copyright}</p>
          <p className="text-[0.65rem] font-semibold tracking-[0.3em] text-brown uppercase">
            {siteInfo.legal}
          </p>
        </div>
      </div>
    </footer>
  );
}
