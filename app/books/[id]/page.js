import { notFound } from "next/navigation";
import PrivateRoute from "@/components/PrivateRoute";
import BookDetails from "@/components/BookDetails";

export const metadata = { title: "Book Details" };

async function getBook(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

export default async function BookDetailsPage({ params }) {
  const { id } = await params;
  const book = await getBook(id);

  if (!book) notFound();

  return (
    <PrivateRoute>
      <BookDetails book={book} />
    </PrivateRoute>
  );
}