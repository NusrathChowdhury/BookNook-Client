
import { BookOpen } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-cream px-4">
      <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-brown/10">
        <BookOpen size={38} className="text-brown" />

        <span className="absolute -right-1 -top-1 h-5 w-5 animate-spin rounded-full border-[3px] border-brown/20 border-t-brown" />
      </div>

      <h2 className="font-serif text-2xl font-bold text-charcoal">
        Opening BookNook
      </h2>

      <p className="mt-2 text-sm text-charcoal/60">
        Finding your next favorite story...
      </p>
    </main>
  );
}
