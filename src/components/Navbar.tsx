
"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, BookOpen } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/books" },
  { name: "Add Book", href: "/add-book" },
  { name: "My Books", href: "/my-books" },
  { name: "My Borrows", href: "/my-borrows" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#25231F]/10 bg-[#F7F3EE]/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen size={28} className="text-[#B58A62]" />
          <span className="text-2xl font-bold text-[#25231F]">
            Book<span className="text-[#B58A62]">Nook</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#25231F] transition hover:text-[#B58A62]"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/signin"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-[#25231F] hover:text-[#B58A62]"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-[#25231F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#B58A62]"
          >
            Sign Up
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-[#25231F] md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-[#25231F]/10 bg-[#F7F3EE] px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-medium text-[#25231F] hover:text-[#B58A62]"
              >
                {link.name}
              </Link>
            ))}

            <hr className="border-[#25231F]/10" />

            <Link href="/signin" onClick={() => setOpen(false)}>
              Sign In
            </Link>

            <Link
              href="/signup"
              onClick={() => setOpen(false)}
              className="w-fit rounded-lg bg-[#25231F] px-5 py-2.5 text-white"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
