"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authFetch } from "@/lib/api";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

export default function MyBorrowsTable() {
  const { data: session } = authClient.useSession();
  const email = session?.user?.email;

  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState(null);


  useEffect(() => {
    if (!email) return;

    const loadBorrows = async () => {
      try {
        const res = await authFetch("/borrows");
        if (!res.ok) throw new Error("Could not load your borrows");
        setBorrows(await res.json());
      } catch (error) {
        toast.error(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    loadBorrows();
  }, [email]);


  const handleReturn = async (borrow) => {
    setReturningId(borrow._id);
    try {
      const res = await authFetch(`/borrows/${borrow._id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Could not return the book");


      setBorrows((prev) => prev.filter((item) => item._id !== borrow._id));
      toast.success(`"${borrow.bookTitle}" returned successfully`);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setReturningId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (borrows.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="opacity-70">You have not borrowed any books yet.</p>
        <Link href="/books" className="btn btn-primary mt-4">
          Browse Books
        </Link>
      </div>
    );
  }

  return (
    <>
      
      <div className="hidden overflow-x-auto rounded-xl border border-base-300 md:block">
        <table className="table">
          <thead>
            <tr className="bg-base-200">
              <th>Image</th>
              <th>Title</th>
              <th>Borrow Date</th>
              <th>Return Date</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {borrows.map((borrow) => (
              <tr key={borrow._id}>
                <td>
                  <img
                    src={borrow.bookImage}
                    alt={borrow.bookTitle}
                    referrerPolicy="no-referrer"
                    className="h-20 w-14 rounded object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://placehold.co/112x160?text=No+Cover";
                    }}
                  />
                </td>
                <td className="font-semibold">
                  <Link href={`/books/${borrow.bookId}`} className="hover:text-primary">
                    {borrow.bookTitle}
                  </Link>
                </td>
                <td>{formatDate(borrow.borrowDate)}</td>
                <td>{formatDate(borrow.returnDate)}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleReturn(borrow)}
                    disabled={returningId === borrow._id}
                    className="btn btn-outline btn-primary btn-sm"
                  >
                    {returningId === borrow._id ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      "Return Book"
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* মোবাইল: কার্ড */}
      <div className="grid gap-4 md:hidden">
        {borrows.map((borrow) => (
          <div
            key={borrow._id}
            className="flex gap-4 rounded-xl border border-base-300 bg-base-100 p-4"
          >
            <img
              src={borrow.bookImage}
              alt={borrow.bookTitle}
              referrerPolicy="no-referrer"
              className="h-28 w-20 shrink-0 rounded object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://placehold.co/160x224?text=No+Cover";
              }}
            />
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <Link href={`/books/${borrow.bookId}`} className="font-semibold hover:text-primary">
                {borrow.bookTitle}
              </Link>
              <p className="text-sm opacity-70">Borrowed: {formatDate(borrow.borrowDate)}</p>
              <p className="text-sm opacity-70">Return by: {formatDate(borrow.returnDate)}</p>
              <button
                onClick={() => handleReturn(borrow)}
                disabled={returningId === borrow._id}
                className="btn btn-outline btn-primary btn-sm mt-2 w-fit"
              >
                {returningId === borrow._id ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "Return Book"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}