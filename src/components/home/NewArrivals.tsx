
import Link from "next/link";

const books = [
  {
    id: "book-1",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Development",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600",
    createdAt: "2026-10-30",
  },
  {
    id: "book-2",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Classic Fiction",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600",
    createdAt: "2026-10-28",
  },
  {
    id: "book-3",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    category: "Mystery",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600",
    createdAt: "2026-10-25",
  },
  {
    id: "book-4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Romance",
    image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600",
    createdAt: "2026-10-22",
  },
  {
    id: "book-5",
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Adventure",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600",
    createdAt: "2026-10-20",
  },
  {
    id: "book-6",
    title: "Ikigai",
    author: "Hector Garcia",
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1513001900722-370f803f498d?w=600",
    createdAt: "2026-10-18",
  },
  {
    id: "book-7",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Finance",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600",
    createdAt: "2026-10-15",
  },
];

const newArrivals = [...books]
  .sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  )
  .slice(0, 6);

export default function NewArrivals() {
  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#B58A62]">
            Fresh From Our Shelves
          </p>

          <h2 className="font-serif text-3xl font-bold text-[#25231F] md:text-4xl">
            New Arrivals
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-[#77716A]">
            Explore our newest collection and discover your next favorite read.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {newArrivals.map((book) => (
            <div
              key={book.id}
              className="overflow-hidden rounded-xl border border-[#25231F]/5 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="h-64 overflow-hidden bg-[#EFE8DE]">
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              <div className="p-6">
                <span className="rounded-full bg-[#F7F3EE] px-3 py-1 text-xs font-medium text-[#9A7250]">
                  {book.category}
                </span>

                <h3 className="mt-4 font-serif text-xl font-bold text-[#25231F]">
                  {book.title}
                </h3>

                <p className="mt-2 text-sm text-[#77716A]">
                  By {book.author}
                </p>

                <Link
                  href={`/books/${book.id}`}
                  className="mt-6 inline-block border-b border-[#B58A62] pb-1 text-sm font-semibold text-[#9A7250] hover:text-[#25231F]"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/books"
            className="inline-block rounded-md bg-[#25231F] px-8 py-3.5 font-semibold text-white transition hover:bg-[#B58A62]"
          >
            See All Books
          </Link>
        </div>
      </div>
    </section>
  );
}
