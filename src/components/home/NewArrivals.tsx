
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  dateAdded?: string;
  createdAt?: string;
};

export default function NewArrivals() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const res = await fetch("http://localhost:5000/books");

        if (!res.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await res.json();

        const latestBooks = [...data]
          .sort(
            (a: Book, b: Book) =>
              new Date(b.dateAdded || b.createdAt || 0).getTime() -
              new Date(a.dateAdded || a.createdAt || 0).getTime()
          )
          .slice(0, 6);

        setBooks(latestBooks);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

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

        {loading ? (
          <div className="flex justify-center py-16">
            <p className="text-sm text-[#77716A]">
              Loading new arrivals...
            </p>
          </div>
        ) : books.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-[#77716A]">
              No books available yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => {
              const bookDate = book.dateAdded || book.createdAt;

              return (
                <div
                  key={book._id}
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

                    <p className="mt-2 text-xs text-[#9A7250]">
                      {bookDate
                        ? `Added on ${new Date(bookDate).toLocaleDateString()}`
                        : "Date unavailable"}
                    </p>

                    <Link
                      href={`/books/${book._id}`}
                      className="mt-6 inline-block border-b border-[#B58A62] pb-1 text-sm font-semibold text-[#9A7250] hover:text-[#25231F]"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

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
