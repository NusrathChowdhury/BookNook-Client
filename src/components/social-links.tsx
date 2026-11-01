import type { ReactNode } from "react";
import { cn } from "cn";

type IconProps = {
  className?: string;
};

function StrokeIcon({
  className,
  children,
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("size-4", className)}
    >
      {children}
    </svg>
  );
}

function FacebookIcon({ className }: IconProps) {
  return (
    <StrokeIcon className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </StrokeIcon>
  );
}

function InstagramIcon({ className }: IconProps) {
  return (
    <StrokeIcon className={className}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </StrokeIcon>
  );
}

function XIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={cn("size-4", className)}
    >
      <path d="M17.53 3H20.5l-6.49 7.41L21.5 21h-5.9l-4.62-6.04L5.7 21H2.72l6.94-7.93L2.5 3h6.05l4.18 5.52L17.53 3Zm-1.04 16.2h1.64L7.6 4.72H5.83L16.49 19.2Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: IconProps) {
  return (
    <StrokeIcon className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </StrokeIcon>
  );
}

function YouTubeIcon({ className }: IconProps) {
  return (
    <StrokeIcon className={className}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.94 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
      <path d="M9.75 15.02 15.5 11.75 9.75 8.48v6.54z" />
    </StrokeIcon>
  );
}

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com/booknook", Icon: FacebookIcon },
  { label: "Instagram", href: "https://instagram.com/booknook", Icon: InstagramIcon },
  { label: "X", href: "https://x.com/booknook", Icon: XIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/booknook", Icon: LinkedInIcon },
  { label: "YouTube", href: "https://www.youtube.com/@booknook", Icon: YouTubeIcon },
];

/** Social row used in the Footer. */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {socialLinks.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-cream/80 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-brown hover:bg-brown hover:text-charcoal focus-visible:ring-3 focus-visible:ring-brown/60 focus-visible:outline-none"
          >
            <Icon className="size-[18px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}
