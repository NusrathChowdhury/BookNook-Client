
import React from "react";
import Link from "next/link";
import Image from "next/image";

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  userName: string;
  userEmail: string;
  createdAt?: string;
  dateAdded?: string;
};

const AllBooksPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) => {
  const res = await fetch("http://localhost:5000/add-book");
  const books: Book[] = await res.json();
  console.log(books);

  const { search } = await searchParams;

  const searchText = search?.trim().toLowerCase();

  const filteredBooks = books.filter((book) => {
    return (
      !searchText ||
      book.title?.toLowerCase().includes(searchText) ||
      book.author?.toLowerCase().includes(searchText) ||
      book.category?.toLowerCase().includes(searchText)
    );
  });

  return (
    <main className="min-h-screen bg-cream px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-brown">
            Discover Your Next Favorite
          </p>

          <h1 className="font-serif text-4xl font-bold text-charcoal sm:text-5xl">
            Explore Our Books
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-charcoal/60 sm:text-base">
            Discover wonderful stories, explore different worlds, and find
            books that inspire your imagination.
          </p>

          <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-brown" />
        </div>

        {/* Search Books */}
        <form
          action="/books"
          method="GET"
          className="mx-auto mb-10 flex max-w-2xl flex-col gap-3 sm:flex-row"
        >
          <input
            type="text"
            name="search"
            defaultValue={search || ""}
            placeholder="Search by title, author or category..."
            className="w-full rounded-xl border border-charcoal/10 bg-white px-5 py-3 text-sm text-charcoal outline-none transition placeholder:text-charcoal/40 focus:border-brown"
          />

          <button
            type="submit"
            className="rounded-xl bg-charcoal px-8 py-3 text-sm font-semibold text-white transition hover:bg-brown"
          >
            Search
          </button>
        </form>

        {/* Book Count */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-2xl font-bold text-charcoal">
              All Books
            </h2>

            {search && (
              <Link
                href="/books"
                className="mt-2 inline-block text-sm font-medium text-brown underline underline-offset-4"
              >
                Clear search
              </Link>
            )}
          </div>

          <p className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brown shadow-sm">
            {filteredBooks.length} Books Available
          </p>
        </div>

        {/* Books Grid */}
        {filteredBooks.length === 0 ? (
          <div className="rounded-2xl bg-white px-6 py-20 text-center shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-charcoal">
              No Books Found
            </h3>

            <p className="mt-3 text-sm text-charcoal/60">
              {search
                ? "No books match your search. Try another title, author or category."
                : "No books have been added yet. Be the first to share a book!"}
            </p>
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book) => (
              <div
                key={book._id}
                className="group overflow-hidden rounded-2xl border border-charcoal/5 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Book Image */}
                <div className="relative flex h-64 items-center justify-center overflow-hidden bg-[#F3EEE7] p-5">
                  <Image
                    src={book.image}
                    alt={book.title}
                    width={300}
                    height={400}
                    className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                    style={{ width: "auto", height: "100%" }}
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brown shadow-sm">
                    {book.category}
                  </span>
                </div>

                {/* Book Details */}
                <div className="p-5">
                  <h3 className="line-clamp-1 font-serif text-xl font-bold text-charcoal">
                    {book.title}
                  </h3>

                  <p className="mt-2 text-sm text-charcoal/55">
                    By {book.author}
                  </p>

                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-charcoal/65">
                    {book.description}
                  </p>

                  <div className="mt-5 border-t border-charcoal/10 pt-4">
                    <p className="text-xs text-charcoal/50">
                      Shared by{" "}
                      <span className="font-semibold text-brown">
                        {book.userName}
                      </span>
                    </p>

                    <p className="mt-1 text-xs text-charcoal/40">
                      {book.dateAdded || book.createdAt
                        ? new Date(
                            book.dateAdded || book.createdAt!
                          ).toLocaleDateString()
                        : "Date unavailable"}
                    </p>
                  </div>

                  <Link
                    href={`/books/${book._id}`}
                    className="mt-5 flex w-full items-center justify-center rounded-xl bg-charcoal px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-brown"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default AllBooksPage;
