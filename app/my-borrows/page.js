import PrivateRoute from "@/components/PrivateRoute";
import MyBorrowsTable from "@/components/MyBorrowsTable";

export const metadata = { title: "My Borrows" };

export default function MyBorrowsPage() {
  return (
    <PrivateRoute>
      <section className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold">My Borrows</h2>
          <p className="mt-2 opacity-80">Books you have borrowed, with their return dates</p>
        </div>
        <MyBorrowsTable />
      </section>
    </PrivateRoute>
  );
}