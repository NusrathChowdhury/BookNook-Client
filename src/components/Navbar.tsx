
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, BookOpen, LogOut, UserRound, ChevronDown } from "lucide-react";
import { authClient } from "@/lib/auth-client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/books" },
  { name: "Add Book", href: "/add-book" },
  { name: "My Books", href: "/my-books" },
  { name: "My Borrows", href: "/MyBorrows" },
];

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      setDropdownOpen(false);
      setOpen(false);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#25231F]/10 bg-[#F7F3EE]/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <BookOpen size={28} className="text-[#B58A62]" />
          <span className="text-2xl font-bold text-[#25231F]">
            Book<span className="text-[#B58A62]">Nook</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
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

        {/* Desktop Auth */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-full p-1 transition hover:bg-[#B58A62]/10"
                aria-label="Open profile menu"
              >
                <Avatar className="h-10 w-10 border-2 border-[#B58A62]/40">
                  <AvatarImage
                    src={user.image || ""}
                    alt={user.name || "User"}
                  />
                  <AvatarFallback className="bg-[#25231F] font-semibold text-white">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>

                <ChevronDown
                  size={16}
                  className={`text-[#77716A] transition ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-14 z-50 w-60 overflow-hidden rounded-xl border border-[#25231F]/10 bg-white p-2 shadow-xl">

                  {/* User Information */}
                  <div className="border-b border-[#25231F]/10 px-3 py-3">
                    <p className="font-semibold text-[#25231F]">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-[#77716A]">
                      {user.email}
                    </p>
                  </div>

                  {/* My Profile */}
                 

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-[#25231F] transition hover:text-[#B58A62]"
              >
                Sign In
              </Link>

              <Link
                href="/signup"
                className="rounded-lg bg-[#25231F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#B58A62]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="text-[#25231F] md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-[#25231F]/10 bg-[#F7F3EE] px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-medium text-[#25231F] transition hover:text-[#B58A62]"
              >
                {link.name}
              </Link>
            ))}

            <hr className="border-[#25231F]/10" />

            {user ? (
              <>
                <div className="flex items-center gap-3 py-2">
                  <Avatar className="h-11 w-11 border-2 border-[#B58A62]/40">
                    <AvatarImage
                      src={user.image || ""}
                      alt={user.name || "User"}
                    />
                    <AvatarFallback className="bg-[#25231F] text-white">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <p className="font-semibold text-[#25231F]">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-[#77716A]">
                      {user.email}
                    </p>
                  </div>
                </div>

                

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-left font-medium text-red-600"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="font-medium text-[#25231F]"
                >
                  Sign In
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="w-fit rounded-lg bg-[#25231F] px-5 py-2.5 text-white transition hover:bg-[#B58A62]"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
