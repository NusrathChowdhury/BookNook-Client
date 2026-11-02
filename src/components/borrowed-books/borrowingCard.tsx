
"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";

type Book = {
  _id: string;
  title: string;
  image: string;
  availableCopies?: number;
};

type BorrowingCardProps = {
  book: Book;
};

const BorrowingCard = ({ book }: BorrowingCardProps) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const isUnavailable =
    typeof book.availableCopies === "number" &&
    book.availableCopies <= 0;

  const handleBorrow = async (
    e: React.SubmitEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!user) {
      setMessage("Please log in before borrowing a book.");
      return;
    }

    if (isUnavailable) {
      setMessage("Not Available");
      return;
    }

    setLoading(true);
    setMessage("");

    const borrowDate = new Date();
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 14);

    const data = {
      bookId: book._id,
      bookTitle: book.title,
      bookImage: book.image,
      userName: user.name,
      userEmail: user.email,
      borrowDate: borrowDate.toISOString(),
      returnDate: returnDate.toISOString(),
      status: "borrowed",
    };

    console.log("Borrow data from frontend:", data);

    try {
      const res = await fetch("http://localhost:5000/borrowed-books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const borrowedBooks = await res.json();

      console.log("Backend response:", borrowedBooks);

      if (!res.ok) {
        throw new Error(
          borrowedBooks.message || "Borrowing failed."
        );
      }

      console.log("Borrowing successful!");

      setMessage("Book borrowed successfully!");
      setIsOpen(false);
    } catch (error) {
      console.log("Borrow error:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Borrow Button */}
      <button
        type="button"
        onClick={() => {
          setMessage("");
          setIsOpen(true);
        }}
        disabled={isUnavailable}
        className="mt-8 w-full rounded-xl bg-charcoal px-6 py-4 text-sm font-semibold text-white transition hover:bg-brown disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isUnavailable ? "Not Available" : "Borrow This Book"}
      </button>

      {message && (
        <p className="mt-3 text-center text-sm font-medium text-brown">
          {message}
        </p>
      )}

      {/* Borrow Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-xl">
            <h2 className="font-serif text-2xl font-bold text-charcoal">
              Borrow This Book
            </h2>

            <p className="mt-2 text-sm text-charcoal/60">
              Confirm your information before borrowing.
            </p>

            <form onSubmit={handleBorrow} className="mt-6 space-y-5">
              {/* User Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-charcoal">
                  User Name
                </label>

                <input
                  type="text"
                  value={user?.name || ""}
                  readOnly
                  className="w-full rounded-xl border border-charcoal/10 bg-cream px-4 py-3 text-sm text-charcoal outline-none"
                />
              </div>

              {/* User Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-charcoal">
                  Email Address
                </label>

                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full rounded-xl border border-charcoal/10 bg-cream px-4 py-3 text-sm text-charcoal outline-none"
                />
              </div>

              <p className="text-xs text-charcoal/50">
                Borrowing period: 14 days.
              </p>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={loading}
                  className="w-full rounded-xl border border-charcoal/15 px-4 py-3 text-sm font-semibold text-charcoal transition hover:bg-cream"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading || !user}
                  className="w-full rounded-xl bg-charcoal px-4 py-3 text-sm font-semibold text-white transition hover:bg-brown disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Confirming..." : "Confirm Borrow"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BorrowingCard;
