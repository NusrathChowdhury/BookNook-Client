"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type BorrowedBook = {
  _id: string;
  bookTitle: string;
  bookImage: string;
  borrowDate: string;
  returnDate: string;
};

const MyBorrowsPage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const [loading, setLoading] = useState(true);

  const user = session?.user;

  useEffect(() => {
    if (isPending) return;

    if (!user?.email) return;

    const getBorrowedBooks = async () => {
      try {
        const { data, error } = await authClient.token();

        if (error || !data?.token) {
          throw new Error("Unable to get JWT");
        }

        const res = await fetch("http://localhost:5000/borrows", {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });

        const result = await res.json();

        if (!res.ok) throw new Error("Failed to fetch borrowed books");

        setBorrowedBooks(result);
      } catch (error) {
        console.log("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    getBorrowedBooks();
  }, [user?.email, isPending]);

  const handleReturn = async (id: string) => {
    const confirmReturn = window.confirm(
      "Are you sure you want to return this book?"
    );

    if (!confirmReturn) return;

    try {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error("Unable to get JWT");
  }

  const res = await fetch(
    `http://localhost:5000/borrows/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );


      const result = await res.json();

      if (res.ok && result.deletedCount > 0) {
        setBorrowedBooks((previousBooks) =>
          previousBooks.filter((book) => book._id !== id)
        );

        alert("Book returned successfully!");
        router.push("/MyBorrows");
        router.refresh();
      } else {
        alert("Book could not be returned.");
      }
    } catch (error) {
      console.log("Delete error:", error);
      alert("Something went wrong!");
    }
  };

  if (isPending || loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#F5F7F5]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#05893E] border-t-transparent"></div>
          <p className="font-medium text-gray-600">
            Loading your borrowed books...
          </p>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#F5F7F5] px-5">
        <div className="w-full max-w-md rounded-2xl bg-white p-10 text-center shadow-sm">
          <div className="mb-5 text-5xl">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900">
            Login Required
          </h2>
          <p className="mt-3 text-gray-500">
            Please log in to view your borrowed books.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#F5F7F5] px-5 py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-[#05893E]">
            Your Reading Journey
          </p>

          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            My Borrows
          </h1>

          <p className="mt-3 max-w-xl text-gray-500">
            Keep track of your borrowed books and their return dates.
          </p>
        </div>

        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Total Borrowed Books
            </p>
            <p className="mt-2 text-3xl font-bold text-[#05893E]">
              {borrowedBooks.length}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Account
            </p>
            <p className="mt-2 truncate text-lg font-semibold text-gray-800">
              {user.email}
            </p>
          </div>
        </div>

        {borrowedBooks.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mb-5 text-6xl">📚</div>

            <h2 className="text-2xl font-bold text-gray-900">
              No Borrowed Books Yet!
            </h2>

            <p className="mx-auto mt-3 max-w-md text-gray-500">
              You haven&apost borrowed any books yet. Explore our collection and
              find your next favorite read.
            </p>

            <button
              onClick={() => router.push("/books")}
              className="mt-7 rounded-lg bg-[#05893E] px-7 py-3 font-semibold text-white transition hover:bg-[#046F32]"
            >
              Explore Books
            </button>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-6 py-5">
              <h2 className="text-lg font-bold text-gray-900">
                Borrowed Books
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                You currently have {borrowedBooks.length} book(s) borrowed.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px] text-left">
                <thead className="bg-[#F0F5F0] text-sm text-gray-600">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Book</th>
                    <th className="px-6 py-4 font-semibold">Title</th>
                    <th className="px-6 py-4 font-semibold">Borrow Date</th>
                    <th className="px-6 py-4 font-semibold">Return Date</th>
                    <th className="px-6 py-4 text-center font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {borrowedBooks.map((book) => (
                    <tr
                      key={book._id}
                      className="border-t border-gray-100 transition hover:bg-[#F8FBF8]"
                    >
                      <td className="px-6 py-5">
                        <div className="relative h-[85px] w-[60px] overflow-hidden rounded-lg shadow-sm">
                          <Image
                            src={book.bookImage}
                            alt={book.bookTitle}
                            fill
                            unoptimized
                            sizes="60px"
                            className="object-cover"
                          />
                        </div>
                      </td>

                      <td className="max-w-[220px] px-6 py-5 font-semibold text-gray-800">
                        {book.bookTitle}
                      </td>

                      <td className="px-6 py-5 text-sm text-gray-600">
                        {new Date(book.borrowDate).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-5 text-sm text-gray-600">
                        {new Date(book.returnDate).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-5 text-center">
                        <button
                          onClick={() => handleReturn(book._id)}
                          className="rounded-lg bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                        >
                          Return Book
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyBorrowsPage;