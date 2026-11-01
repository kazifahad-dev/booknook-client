import BookCard from "@/components/BookCard";

export const metadata = {
  title: "All Books",
};

async function getAllBooks() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    return [];
  }
}

export default async function AllBooksPage() {
  const books = await getAllBooks();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold">All Books</h2>
        <p className="mt-2 opacity-80">
          Every book on our shelf, ready to be borrowed
        </p>
      </div>

      {books.length === 0 ? (
        <p className="text-center opacity-70">
          No books available right now. Please check back soon.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </section>
  );
}