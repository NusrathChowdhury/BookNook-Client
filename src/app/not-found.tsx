
import Link from "next/link";
import { BookOpen, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-5 py-16">
      <div className="w-full max-w-xl text-center">
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-2xl bg-brown/10">
          <BookOpen size={40} className="text-brown" />
        </div>

        <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-brown">
          Lost Between the Pages?
        </p>

        <h1 className="font-serif text-8xl font-bold text-brown sm:text-9xl">
          404
        </h1>

        <h2 className="mt-5 font-serif text-3xl font-bold text-charcoal">
          This Page Is Not on Our Shelf
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-charcoal/60">
          It looks like this page has wandered away from our library.
          Don&apost worry, there are plenty of wonderful books waiting for you.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-charcoal px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-brown"
        >
          <Home size={18} />
          Back to Home
        </Link>

        <p className="mt-8 flex items-center justify-center gap-2 text-xs text-charcoal/40">
          <Search size={14} />
          Keep exploring BookNook
        </p>
      </div>
    </main>
  );
}
