
import Link from "next/link";
import { BookOpen, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/books" },
  { name: "Add Book", href: "/add-book" },
  { name: "My Books", href: "/my-books" },
  { name: "My Borrows", href: "/my-borrows" },
];

export default function Footer() {
  return (
    <footer className="bg-[#25231F] text-[#F7F3EE]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="mb-4 flex items-center gap-2">
            <BookOpen size={28} className="text-[#B58A62]" />
            <span className="text-2xl font-bold">
              Book<span className="text-[#B58A62]">Nook</span>
            </span>
          </Link>

          <p className="max-w-xs text-sm leading-7 text-[#F7F3EE]/65">
            Discover your next favorite book and enjoy a wonderful reading
            experience with BookNook.
          </p>
        </div>

        <div>
          <h3 className="mb-5 text-lg font-semibold">Explore</h3>
          <ul className="space-y-3">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-[#F7F3EE]/65 transition hover:text-[#B58A62]"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-lg font-semibold">Contact Us</h3>
          <ul className="space-y-4 text-sm text-[#F7F3EE]/65">
            <li className="flex items-center gap-3">
              <Mail size={17} className="text-[#B58A62]" />
              hello@booknook.com
            </li>
            <li className="flex items-center gap-3">
              <Phone size={17} className="text-[#B58A62]" />
              +880 1234-567890
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={17} className="text-[#B58A62]" />
              Bangladesh
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-lg font-semibold">Reading Starts Here</h3>
          <p className="text-sm leading-7 text-[#F7F3EE]/65">
            Every book opens a new world. Find yours at BookNook.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-5 text-center text-sm text-[#F7F3EE]/50">
          © {new Date().getFullYear()} BookNook. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
