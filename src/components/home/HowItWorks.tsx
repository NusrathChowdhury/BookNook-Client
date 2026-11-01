
import {
  Search,
  BookMarked,
  BookOpen,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover Books",
    description:
      "Explore our collection and find books that match your interests.",
    icon: Search,
  },
  {
    number: "02",
    title: "Borrow Your Favorite",
    description:
      "Choose a book you love and follow the borrowing process.",
    icon: BookMarked,
  },
  {
    number: "03",
    title: "Enjoy Reading",
    description:
      "Start reading, discover new ideas, and enjoy every page.",
    icon: BookOpen,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#F7F3EE] px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#B58A62]">
            Simple & Enjoyable
          </p>

          <h2 className="font-serif text-3xl font-bold text-[#25231F] md:text-4xl">
            How BookNook Works
          </h2>

          <p className="mt-4 text-[#77716A]">
            Your next reading adventure is just three steps away.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="rounded-xl border border-[#25231F]/5 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#F7F3EE] text-[#B58A62]">
                  <Icon size={29} />
                </div>

                <p className="mb-2 text-sm font-bold tracking-widest text-[#B58A62]">
                  STEP {step.number}
                </p>

                <h3 className="font-serif text-xl font-bold text-[#25231F]">
                  {step.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#77716A]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
