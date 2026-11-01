"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import {
  BookOpen,
  ImagePlus,
  UserRound,
  Mail,
  LibraryBig,
  Sparkles,
  Upload,
} from "lucide-react";

const AddBook = () => {
  const [loading, setLoading] = useState(false);

  const handleAddBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const bookData = {
        title: formData.get("title"),
        author: formData.get("author"),
        category: formData.get("category"),
        image: formData.get("image"),
        description: formData.get("description"),
        userName: formData.get("userName"),
        userEmail: formData.get("userEmail"),
      };

      const res = await fetch("http://localhost:5000/add-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        throw new Error("Failed to add book");
      }

      toast.success("Your book has been added successfully!");
      form.reset();

    } catch (error) {
      toast.error("Failed to add book. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-cream px-4 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-5xl">

        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brown/10 text-brown">
            <BookOpen size={28} />
          </div>

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-brown">
            Share the joy of reading
          </p>

          <h1 className="font-serif text-4xl font-bold text-charcoal sm:text-5xl">
            Add a New Book
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-charcoal/60 sm:text-base">
            Every book has a story worth sharing. Add your favorite book to
            BookNook and let others discover it.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-[0_15px_50px_rgba(37,35,31,0.06)]">

          <div className="border-b border-charcoal/10 bg-[#F9F6F1] px-6 py-6 sm:px-10">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brown text-white">
                <LibraryBig size={21} />
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-charcoal">
                  Book Information
                </h2>
                <p className="mt-1 text-xs text-charcoal/55">
                  Fill in the details below to add your book.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleAddBook} className="space-y-7 p-6 sm:p-10">

            <div>
              <label className="mb-2 block text-sm font-semibold text-charcoal">
                Book Title <span className="text-brown">*</span>
              </label>

              <input
                type="text"
                name="title"
                placeholder="e.g. The Alchemist"
                required
                className="w-full rounded-xl border border-charcoal/15 bg-cream/30 px-4 py-3.5 text-sm text-charcoal outline-none transition placeholder:text-charcoal/35 focus:border-brown focus:ring-2 focus:ring-brown/10"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-charcoal">
                  Author Name <span className="text-brown">*</span>
                </label>

                <input
                  type="text"
                  name="author"
                  placeholder="Enter author name"
                  required
                  className="w-full rounded-xl border border-charcoal/15 bg-cream/30 px-4 py-3.5 text-sm text-charcoal outline-none transition placeholder:text-charcoal/35 focus:border-brown focus:ring-2 focus:ring-brown/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-charcoal">
                  Category <span className="text-brown">*</span>
                </label>

                <select
                  name="category"
                  required
                  defaultValue=""
                  className="w-full rounded-xl border border-charcoal/15 bg-cream/30 px-4 py-3.5 text-sm text-charcoal outline-none transition focus:border-brown focus:ring-2 focus:ring-brown/10"
                >
                  <option value="" disabled>
                    Choose a category
                  </option>
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
                Book Cover Image URL <span className="text-brown">*</span>
              </label>

              <div className="relative">
                <ImagePlus
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-brown"
                />

                <input
                  type="url"
                  name="image"
                  placeholder="https://example.com/book-cover.jpg"
                  required
                  className="w-full rounded-xl border border-charcoal/15 bg-cream/30 py-3.5 pl-12 pr-4 text-sm text-charcoal outline-none transition placeholder:text-charcoal/35 focus:border-brown focus:ring-2 focus:ring-brown/10"
                />
              </div>

              <p className="mt-2 text-xs text-charcoal/50">
                Paste a direct image URL of the book cover.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-charcoal">
                Short Description <span className="text-brown">*</span>
              </label>

              <textarea
                name="description"
                rows={5}
                placeholder="Tell readers a little about this book..."
                required
                className="w-full resize-none rounded-xl border border-charcoal/15 bg-cream/30 px-4 py-3.5 text-sm leading-7 text-charcoal outline-none transition placeholder:text-charcoal/35 focus:border-brown focus:ring-2 focus:ring-brown/10"
              />
            </div>

            <div className="rounded-xl border border-brown/15 bg-[#F9F6F1] p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brown/10 text-brown">
                  <UserRound size={20} />
                </div>

                <div>
                  <h3 className="font-serif text-lg font-bold text-charcoal">
                    Your Information
                  </h3>
                  <p className="text-xs text-charcoal/55">
                    Enter your details as the book contributor.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-charcoal">
                    <UserRound size={15} className="text-brown" />
                    User Name
                  </label>

                  <input
                    type="text"
                    name="userName"
                    placeholder="Enter your name"
                    required
                    className="w-full rounded-lg border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal outline-none transition placeholder:text-charcoal/35 focus:border-brown"
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-charcoal">
                    <Mail size={15} className="text-brown" />
                    User Email
                  </label>

                  <input
                    type="email"
                    name="userEmail"
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-lg border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal outline-none transition placeholder:text-charcoal/35 focus:border-brown"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-charcoal px-6 py-4 text-sm font-bold text-white shadow-md transition duration-300 hover:bg-brown disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Adding Your Book...
                  </>
                ) : (
                  <>
                    <Upload size={18} />
                    Add Book to BookNook
                    <Sparkles size={16} />
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-xs text-charcoal/45">
                Thank you for sharing your love of books with our community.
              </p>
            </div>

          </form>
        </div>
      </div>
    </main>
  );
};

export default AddBook;