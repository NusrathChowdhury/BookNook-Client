export type NavItem = {
  /** Visible label in the navigation. */
  label: string;
  /** Route the item points to. */
  href: string;
};

/**
 * Primary navigation. Edit `href` values here to match your routes —
 * both the Navbar and the Footer read from this single source.
 */
export const navLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/books" },
  { label: "Add Book", href: "/books/new" },
  { label: "My Books", href: "/my-books" },
  { label: "My Borrows", href: "/my-borrows" },
];

export const authLinks = {
  signIn: { label: "Sign In", href: "/sign-in" },
  signUp: { label: "Sign Up", href: "/sign-up" },
} as const;

/** Brand, contact and legal copy shared across the site shell. */
export const siteInfo = {
  name: "BookNook",
  tagline: "Bookstore",
  description:
    "A quiet corner for curious readers — curated new arrivals, timeless classics and hand-picked recommendations, gathered in one beautifully simple place.",
  email: "hello@booknook.com",
  phone: "+1 (555) 123-4567",
  phoneHref: "tel:+15551234567",
  address: "42 Maple Avenue, Portland, OR 97205",
  hours: [
    { days: "Mon – Fri", time: "9:00 – 20:00" },
    { days: "Saturday", time: "10:00 – 18:00" },
    { days: "Sunday", time: "11:00 – 16:00" },
  ],
  copyright: `© ${new Date().getFullYear()} BookNook. All rights reserved.`,
  legal: "Crafted for readers, everywhere.",
} as const;
