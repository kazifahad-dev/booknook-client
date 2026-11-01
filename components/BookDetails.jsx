"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authFetch } from "@/lib/api";

export default function BookDetails({ book }) {
  const router = useRouter();
  const modalRef = useRef(null);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [availableCopies, setAvailableCopies] = useState(book.availableCopies);
  const [loading, setLoading] = useState(false);

  const notAvailable = availableCopies <= 0;

  const addedDate = new Date(book.addedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  const handleBorrow = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await authFetch("/borrows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId: book._id }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Could not borrow this book");
      }

      toast.success("Book borrowed successfully! Return it within 7 days.");
      setAvailableCopies((prev) => prev - 1);
      modalRef.current?.close();
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      modalRef.current?.close();
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
      <div className="grid gap-10 md:grid-cols-2">

        <div className="overflow-hidden rounded-xl border border-base-300 bg-base-200">
          <img
            src={book.image}
            alt={book.title}
            referrerPolicy="no-referrer"
            className="h-full max-h-[520px] w-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://placehold.co/400x600?text=No+Cover";
            }}
          />
        </div>


        <div className="flex flex-col gap-4">
          <span className="badge badge-outline w-fit">{book.category}</span>
          <h1 className="text-3xl font-bold md:text-4xl">{book.title}</h1>
          <p className="text-lg opacity-80">by {book.author}</p>

          <p className="leading-relaxed">{book.description}</p>

          <div className="rounded-lg border border-base-300 bg-base-200 p-4 text-sm">
            <p>
              <span className="font-semibold">Added by:</span> {book.userName}
            </p>
            <p>
              <span className="font-semibold">Added on:</span> {addedDate}
            </p>
            <p>
              <span className="font-semibold">Copies available:</span>{" "}
              {availableCopies} of {book.totalCopies}
            </p>
          </div>

          <button
            onClick={() => modalRef.current?.showModal()}
            disabled={notAvailable}
            className="btn btn-primary mt-2 w-full md:w-fit"
          >
            {notAvailable ? "Not Available" : "Borrow This Book"}
          </button>
        </div>
      </div>


      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="text-xl font-bold">Borrow "{book.title}"</h3>
          <p className="mt-1 text-sm opacity-70">
            You can keep this book for 7 days.
          </p>

          <form onSubmit={handleBorrow} className="mt-5 flex flex-col gap-4">
            <label className="form-control">
              <span className="mb-1 text-sm font-medium">Your Name</span>
              <input
                type="text"
                value={user?.name || ""}
                readOnly
                className="input input-bordered w-full bg-base-200"
              />
            </label>

            <label className="form-control">
              <span className="mb-1 text-sm font-medium">Your Email</span>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full bg-base-200"
              />
            </label>

            <div className="modal-action">
              <button
                type="button"
                onClick={() => modalRef.current?.close()}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button type="submit" disabled={loading} className="btn btn-primary">
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Confirm Borrow"
                )}
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </section>
  );
}