import PrivateRoute from "@/components/PrivateRoute";
import AddBookForm from "@/components/AddBookForm";

export const metadata = { title: "Add Book" };

export default function AddBookPage() {
  return (
    <PrivateRoute>
      <section className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold">Add a Book</h2>
          <p className="mt-2 opacity-80">Share a book with the BookNook community</p>
        </div>
        <AddBookForm />
      </section>
    </PrivateRoute>
  );
}