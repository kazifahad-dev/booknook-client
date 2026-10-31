import Link from "next/link";
import BookCard from "./BookCard";

async function getLatestBooks() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books?limit=6`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    return [];
  }
}

export default async function NewArrivals() {
  const books = await getLatestBooks();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold">New Arrivals</h2>
        <p className="mt-2 opacity-80">The latest books added to our shelf</p>
      </div>

      {books.length === 0 ? (
        <p className="text-center opacity-70">
          No books yet. Be the first to add one!
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <Link href="/books" className="btn btn-primary">
          See All Books
        </Link>
      </div>
    </section>
  );
}