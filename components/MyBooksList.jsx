"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

export default function MyBooksList() {
  const { data: session } = authClient.useSession();
  const email = session?.user?.email;

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [saving, setSaving] = useState(false);
  const [removing, setRemoving] = useState(false);

  const editRef = useRef(null);
  const deleteRef = useRef(null);

  
  useEffect(() => {
    if (!email) return;

    const loadBooks = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/books?email=${encodeURIComponent(email)}`
        );
        if (!res.ok) throw new Error("Could not load your books");
        setBooks(await res.json());
      } catch (error) {
        toast.error(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [email]);

  const openEdit = (book) => {
    setEditing(book);
    editRef.current?.showModal();
  };

  const openDelete = (book) => {
    setDeleting(book);
    deleteRef.current?.showModal();
  };

  
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setSaving(true);

    try {
      let imageUrl = editing.image;

      
      const file = formData.get("image");
      if (file && file.size > 0) {
        if (file.size > 5 * 1024 * 1024) {
          throw new Error("Image must be smaller than 5 MB");
        }
        const imgData = new FormData();
        imgData.append("image", file);
        const imgRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
          { method: "POST", body: imgData }
        );
        const imgJson = await imgRes.json();
        if (!imgJson.success) throw new Error("Image upload failed");
        imageUrl = imgJson.data.display_url;
      }

      const updated = {
        title: formData.get("title"),
        author: formData.get("author"),
        category: formData.get("category"),
        description: formData.get("description"),
        image: imageUrl,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${editing._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Could not update the book");

      
      setBooks((prev) =>
        prev.map((b) => (b._id === editing._id ? { ...b, ...updated } : b))
      );
      toast.success("Book updated successfully!");
      editRef.current?.close();
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  
  const handleDelete = async () => {
    setRemoving(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${deleting._id}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Could not delete the book");

      setBooks((prev) => prev.filter((b) => b._id !== deleting._id));
      toast.success(`"${deleting.title}" deleted`);
      deleteRef.current?.close();
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setRemoving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <>
      {books.length === 0 ? (
        <div className="py-16 text-center">
          <p className="opacity-70">You have not added any books yet.</p>
          <Link href="/add-book" className="btn btn-primary mt-4">
            Add Your First Book
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-base-300">
          <table className="table">
            <thead>
              <tr className="bg-base-200">
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Copies</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>
                    <img
                      src={book.image}
                      alt={book.title}
                      referrerPolicy="no-referrer"
                      className="h-20 w-14 rounded object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://placehold.co/112x160?text=No+Cover";
                      }}
                    />
                  </td>
                  <td>
                    <Link href={`/books/${book._id}`} className="font-semibold hover:text-primary">
                      {book.title}
                    </Link>
                    <p className="text-sm opacity-70">by {book.author}</p>
                  </td>
                  <td>
                    <span className="badge badge-outline">{book.category}</span>
                  </td>
                  <td>
                    {book.availableCopies} / {book.totalCopies}
                  </td>
                  <td className="text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(book)} className="btn btn-outline btn-primary btn-sm">
                        Edit
                      </button>
                      <button onClick={() => openDelete(book)} className="btn btn-outline btn-error btn-sm">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}


      <dialog ref={editRef} className="modal">
        <div className="modal-box max-w-xl">
          <h3 className="text-xl font-bold">Edit Book</h3>

          {editing && (
            <form key={editing._id} onSubmit={handleUpdate} className="mt-5 grid gap-4">
              <label className="form-control">
                <span className="mb-1 text-sm font-medium">Book Title</span>
                <input name="title" type="text" required defaultValue={editing.title} className="input input-bordered w-full" />
              </label>

              <label className="form-control">
                <span className="mb-1 text-sm font-medium">Author Name</span>
                <input name="author" type="text" required defaultValue={editing.author} className="input input-bordered w-full" />
              </label>

              <label className="form-control">
                <span className="mb-1 text-sm font-medium">Category</span>
                <select name="category" required defaultValue={editing.category} className="select select-bordered w-full">
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </label>

              <label className="form-control">
                <span className="mb-1 text-sm font-medium">New Image (optional)</span>
                <input name="image" type="file" accept="image/*" className="file-input file-input-bordered w-full" />
              </label>

              <label className="form-control">
                <span className="mb-1 text-sm font-medium">Short Description</span>
                <textarea name="description" required rows={4} defaultValue={editing.description} className="textarea textarea-bordered w-full" />
              </label>

              <div className="modal-action">
                <button type="button" onClick={() => editRef.current?.close()} className="btn btn-ghost">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="btn btn-primary">
                  {saving ? <span className="loading loading-spinner loading-sm"></span> : "Save Changes"}
                </button>
              </div>
            </form>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      
      <dialog ref={deleteRef} className="modal">
        <div className="modal-box">
          <h3 className="text-xl font-bold">Delete this book?</h3>
          <p className="mt-3">
            <span className="font-semibold">{deleting?.title}</span> will be removed
            permanently. This cannot be undone.
          </p>
          <div className="modal-action">
            <button onClick={() => deleteRef.current?.close()} className="btn btn-ghost">
              Cancel
            </button>
            <button onClick={handleDelete} disabled={removing} className="btn btn-error">
              {removing ? <span className="loading loading-spinner loading-sm"></span> : "Yes, Delete"}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}