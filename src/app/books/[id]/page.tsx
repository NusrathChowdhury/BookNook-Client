
import React from "react";
import Image from "next/image";
import Link from "next/link";
import BorrowingCard from "@/components/borrowed-books/borrowingCard";

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
};

const BooksDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/books/${id}`);
  const book: Book = await res.json();

  if (!res.ok || !book) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream px-5">
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-charcoal">
            Book Not Found
          </h2>

          <p className="mt-3 text-sm text-charcoal/60">
            Sorry, we couldnt find this book.
          </p>

          <Link
            href="/books"
            className="mt-6 inline-block rounded-xl bg-charcoal px-6 py-3 text-sm font-semibold text-white transition hover:bg-brown"
          >
            Back to Books
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-7xl">

        {/* Back Link */}
        <Link
          href="/books"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-brown transition hover:text-charcoal"
        >
          <span className="text-lg">←</span>
          Back to All Books
        </Link>

        {/* Book Details Card */}
        <div className="grid overflow-hidden rounded-3xl border border-charcoal/5 bg-white shadow-lg md:grid-cols-[0.9fr_1.1fr]">

          {/* Book Image Section */}
          <div className="flex min-h-[550px] items-center justify-center bg-[#F0EAE2] p-8 sm:min-h-[650px] sm:p-12 lg:p-14">
            <div className="relative h-[460px] w-full max-w-[340px] sm:h-[520px]">
              <Image
                src={book.image}
                alt={book.title}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          {/* Book Information Section */}
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brown">
              Welcome to BookNook
            </p>

            {/* Category */}
            <div className="mt-6">
              <span className="inline-block rounded-full bg-[#F7F3EE] px-5 py-2 text-xs font-semibold text-brown">
                {book.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="mt-6 font-serif text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
              {book.title}
            </h1>

            {/* Author */}
            <p className="mt-5 text-base text-charcoal/60">
              Written by{" "}
              <span className="font-semibold text-brown">
                {book.author}
              </span>
            </p>

            <div className="my-8 h-px bg-charcoal/10" />

            {/* Description */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-charcoal">
                About This Book
              </h2>

              <p className="mt-4 text-sm leading-8 text-charcoal/65 sm:text-base">
                {book.description}
              </p>
            </div>

            {/* Contributor Information */}
            <div className="mt-9 rounded-2xl border border-charcoal/5 bg-cream p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white font-serif text-lg font-bold text-brown">
                  {book.userName?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brown">
                    Shared by
                  </p>

                  <h3 className="mt-1 font-serif text-lg font-bold text-charcoal">
                    {book.userName}
                  </h3>
                </div>
              </div>

              <p className="mt-4 break-all text-sm text-charcoal/55">
                {book.userEmail}
              </p>

              <div className="mt-4 border-t border-charcoal/10 pt-4">
                <p className="text-xs text-charcoal/50">
                  Added on:{" "}
                  <span className="font-medium text-charcoal/70">
                    {book.createdAt
                      ? new Date(book.createdAt).toLocaleDateString()
                      : "Date unavailable"}
                  </span>
                </p>
              </div>
            </div>

            {/* Borrow Button */}
<BorrowingCard book={book} />
            
            <p className="mt-3 text-center text-xs text-charcoal/45">
              Borrowing will be available once the Borrow System is connected.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-14 text-center">
          <p className="font-serif text-2xl font-bold text-charcoal">
            Every book has a story.
          </p>

          <p className="mt-3 text-sm text-charcoal/55">
            Discover more books and find your next favorite read.
          </p>

          <Link
            href="/books"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-charcoal/15 bg-white px-7 py-3 text-sm font-semibold text-charcoal transition hover:border-brown hover:bg-brown hover:text-white"
          >
            Explore More Books
            <span>→</span>
          </Link>
        </div>

      </div>
    </main>
  );
};

export default BooksDetailsPage;
