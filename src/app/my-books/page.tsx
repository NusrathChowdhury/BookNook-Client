
"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import {
  BookOpen,
  Pencil,
  Trash2,
  X,
  Save,
  Loader2,
  LibraryBig,
  Plus,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies: number;
  userName: string;
  userEmail: string;
  dateAdded?: string;
};

const MyBooks = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const [editBook, setEditBook] = useState<Book | null>(null);
  const [deleteBook, setDeleteBook] = useState<Book | null>(null);

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Get books added by the logged-in user
  useEffect(() => {
    if (isPending || !user?.email) return;

    const fetchMyBooks = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/my-books/${user.email}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await res.json();
        setBooks(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load your books.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyBooks();
  }, [user?.email, isPending]);

  // Update book
  const handleUpdateBook = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!editBook || !user?.email) return;

    setSaving(true);

    try {
      const formData = new FormData(e.currentTarget);

      const updatedData = {
        title: String(formData.get("title") ?? ""),
        author: String(formData.get("author") ?? ""),
        category: String(formData.get("category") ?? ""),
        image: String(formData.get("image") ?? ""),
        description: String(formData.get("description") ?? ""),
        totalCopies: Number(formData.get("totalCopies")),
        userEmail: user.email,
      };

      const res = await fetch(
        `http://localhost:5000/my-books/${editBook._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      const data = await res.json();

      if (!res.ok || data.matchedCount === 0) {
        throw new Error("Failed to update book");
      }

      setBooks((previousBooks) =>
        previousBooks.map((book) =>
          book._id === editBook._id
            ? { ...book, ...updatedData }
            : book
        )
      );

      setEditBook(null);
      toast.success("Book updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update book.");
    } finally {
      setSaving(false);
    }
  };

  // Delete book
  const handleDeleteBook = async () => {
    if (!deleteBook || !user?.email) return;

    setDeleting(true);

    try {
      const res = await fetch(
        `http://localhost:5000/my-books/${deleteBook._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: user.email,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || data.deletedCount === 0) {
        throw new Error("Failed to delete book");
      }

      setBooks((previousBooks) =>
        previousBooks.filter((book) => book._id !== deleteBook._id)
      );

      setDeleteBook(null);
      toast.success("Book deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete book.");
    } finally {
      setDeleting(false);
    }
  };

  if (isPending) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-cream">
        <Loader2 size={38} className="animate-spin text-brown" />
        <p className="mt-4 text-sm text-charcoal/60">
          Loading your books...
        </p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-cream px-5">
        <div className="text-center">
          <BookOpen size={45} className="mx-auto text-brown" />
          <h1 className="mt-5 font-serif text-3xl font-bold text-charcoal">
            Please Log In
          </h1>
          <p className="mt-3 text-sm text-charcoal/60">
            Log in to manage the books you have shared.
          </p>
          <Link
            href="/signin"
            className="mt-6 inline-flex rounded-xl bg-charcoal px-6 py-3 text-sm font-bold text-white transition hover:bg-brown"
          >
            Log In
          </Link>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-cream">
        <Loader2 size={38} className="animate-spin text-brown" />
        <p className="mt-4 text-sm text-charcoal/60">
          Loading your books...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream px-4 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-brown">
              Your personal collection
            </p>

            <h1 className="font-serif text-4xl font-bold text-charcoal sm:text-5xl">
              My Books
            </h1>

            <p className="mt-3 text-sm leading-7 text-charcoal/60">
              Manage the books you have shared with the BookNook community.
            </p>
          </div>

          <Link
            href="/add-book"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-charcoal px-5 py-3 text-sm font-bold text-white transition hover:bg-brown"
          >
            <Plus size={18} />
            Add New Book
          </Link>
        </div>

        {/* Book count */}
        <div className="mb-7 flex items-center gap-3 rounded-xl border border-charcoal/10 bg-white p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brown/10 text-brown">
            <LibraryBig size={22} />
          </div>

          <div>
            <p className="text-xs text-charcoal/55">Books Shared</p>
            <p className="font-serif text-2xl font-bold text-charcoal">
              {books.length}
            </p>
          </div>
        </div>

        {/* Books */}
        {books.length === 0 ? (
          <div className="rounded-2xl border border-charcoal/10 bg-white px-5 py-16 text-center">
            <BookOpen size={48} className="mx-auto text-brown/60" />

            <h2 className="mt-5 font-serif text-2xl font-bold text-charcoal">
              No Books Added Yet
            </h2>

            <p className="mt-3 text-sm text-charcoal/60">
              You haven&apos;t shared any books with the community yet.
            </p>

            <Link
              href="/add-book"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brown px-6 py-3 text-sm font-bold text-white transition hover:bg-charcoal"
            >
              <Plus size={17} />
              Add Your First Book
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <div
                key={book._id}
                className="overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-[0_8px_30px_rgba(37,35,31,0.05)]"
              >
                <div className="flex h-64 items-center justify-center bg-[#F9F6F1] p-5">
                  <Image
                 
                    src={book.image}
                    alt={book.title}
                    className="h-full max-w-full object-contain"
                    height={250}
                    width={250}
                  />
                </div>

                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-brown">
                    {book.category}
                  </p>

                  <h2 className="mt-2 line-clamp-1 font-serif text-xl font-bold text-charcoal">
                    {book.title}
                  </h2>

                  <p className="mt-1 text-sm text-charcoal/60">
                    By {book.author}
                  </p>

                  <p className="mt-4 line-clamp-2 text-sm leading-6 text-charcoal/60">
                    {book.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-charcoal/10 pt-4">
                    <span className="text-xs text-charcoal/55">
                      Available Copies
                    </span>

                    <span className="rounded-lg bg-brown/10 px-3 py-1 text-sm font-bold text-brown">
                      {book.totalCopies}
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setEditBook(book)}
                      className="flex items-center justify-center gap-2 rounded-lg border border-brown px-3 py-2.5 text-sm font-bold text-brown transition hover:bg-brown hover:text-white"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>

                    <button
                      onClick={() => setDeleteBook(book)}
                      className="flex items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-600 hover:text-white"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-8 w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-charcoal/10 bg-[#F9F6F1] px-6 py-5">
              <div>
                <h2 className="font-serif text-2xl font-bold text-charcoal">
                  Edit Book
                </h2>
                <p className="mt-1 text-xs text-charcoal/55">
                  Update your book information.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEditBook(null)}
                disabled={saving}
                className="rounded-lg p-2 text-charcoal/60 transition hover:bg-brown/10 hover:text-brown"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleUpdateBook} className="space-y-5 p-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-charcoal">
                  Book Title
                </label>
                <input
                  name="title"
                  defaultValue={editBook.title}
                  required
                  className="w-full rounded-xl border border-charcoal/15 bg-cream/30 px-4 py-3 text-sm text-charcoal outline-none focus:border-brown"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-charcoal">
                    Author
                  </label>
                  <input
                    name="author"
                    defaultValue={editBook.author}
                    required
                    className="w-full rounded-xl border border-charcoal/15 bg-cream/30 px-4 py-3 text-sm text-charcoal outline-none focus:border-brown"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-charcoal">
                    Category
                  </label>
                  <select
                    name="category"
                    defaultValue={editBook.category}
                    required
                    className="w-full rounded-xl border border-charcoal/15 bg-cream/30 px-4 py-3 text-sm text-charcoal outline-none focus:border-brown"
                  >
                    <option value="Fiction">Fiction</option>
                    <option value="Science">Science</option>
                    <option value="History">History</option>
                    <option value="Kids">Kids</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-charcoal">
                  Total Copies
                </label>
                <input
                  type="number"
                  name="totalCopies"
                  defaultValue={editBook.totalCopies}
                  min="0"
                  step="1"
                  required
                  className="w-full rounded-xl border border-charcoal/15 bg-cream/30 px-4 py-3 text-sm text-charcoal outline-none focus:border-brown"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-charcoal">
                  Book Cover Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  defaultValue={editBook.image}
                  required
                  className="w-full rounded-xl border border-charcoal/15 bg-cream/30 px-4 py-3 text-sm text-charcoal outline-none focus:border-brown"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-charcoal">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={editBook.description}
                  rows={4}
                  required
                  className="w-full resize-none rounded-xl border border-charcoal/15 bg-cream/30 px-4 py-3 text-sm leading-6 text-charcoal outline-none focus:border-brown"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-charcoal/10 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setEditBook(null)}
                  disabled={saving}
                  className="rounded-xl border border-charcoal/15 px-6 py-3 text-sm font-bold text-charcoal transition hover:bg-cream"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center justify-center gap-2 rounded-xl bg-charcoal px-6 py-3 text-sm font-bold text-white transition hover:bg-brown disabled:opacity-60"
                >
                  {saving ? (
                    <Loader2 size={17} className="animate-spin" />
                  ) : (
                    <Save size={17} />
                  )}
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
              <Trash2 size={27} />
            </div>

            <h2 className="mt-5 text-center font-serif text-2xl font-bold text-charcoal">
              Delete This Book?
            </h2>

            <p className="mt-3 text-center text-sm leading-6 text-charcoal/60">
              Are you sure you want to delete{" "}
              <span className="font-bold text-charcoal">
                {deleteBook.title}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeleteBook(null)}
                disabled={deleting}
                className="rounded-xl border border-charcoal/15 px-4 py-3 text-sm font-bold text-charcoal transition hover:bg-cream"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteBook}
                disabled={deleting}
                className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                {deleting && (
                  <Loader2 size={16} className="animate-spin" />
                )}
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default MyBooks;
