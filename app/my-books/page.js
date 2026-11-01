import PrivateRoute from "@/components/PrivateRoute";
import MyBooksList from "@/components/MyBooksList";

export const metadata = { title: "My Books" };

export default function MyBooksPage() {
  return (
    <PrivateRoute>
      <section className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold">My Books</h2>
          <p className="mt-2 opacity-80">Books you have added to the shelf</p>
        </div>
        <MyBooksList />
      </section>
    </PrivateRoute>
  );
}