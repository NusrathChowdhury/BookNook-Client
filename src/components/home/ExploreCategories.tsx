
import Link from "next/link";
import {
  BookOpen,
  Heart,
  Brain,
  Compass,
  Search,
  Sparkles,
} from "lucide-react";

const categories = [
  { name: "Fiction", icon: BookOpen },
  { name: "Romance", icon: Heart },
  { name: "Self Development", icon: Brain },
  { name: "Adventure", icon: Compass },
  { name: "Mystery", icon: Search },
  { name: "Lifestyle", icon: Sparkles },
];

export default function ExploreCategories() {
  return (
    <section className="bg-white px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brown">
            Find Your Interest
          </p>

          <h2 className="font-serif text-3xl font-bold text-[#25231F] md:text-4xl">
            Explore Categories
          </h2>

          <p className="mt-4 text-[#77716A]">
            Find the perfect book for every mood and interest.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                href="/books"
                key={category.name}
                className="group rounded-xl border border-[#25231F]/10 bg-[#F7F3EE] p-6 text-center transition hover:-translate-y-1 hover:border-[#B58A62] hover:shadow-md"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#B58A62] transition group-hover:bg-[#25231F] group-hover:text-white">
                  <Icon size={25} />
                </div>

                <h3 className="font-serif text-lg font-bold text-[#25231F]">
                  {category.name}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
