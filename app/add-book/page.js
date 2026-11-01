import PrivateRoute from "@/components/PrivateRoute";

export const metadata = { title: "Add Book" };

export default function AddBookPage() {
  return (
    <PrivateRoute>
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold">Add Book</h2>
      </div>
    </PrivateRoute>
  );
}