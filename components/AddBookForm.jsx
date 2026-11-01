"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authFetch } from "@/lib/api";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

export default function AddBookForm() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const file = formData.get("image");

    if (!file || file.size === 0) {
      toast.error("Please choose a book cover image");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5 MB");
      return;
    }

    setLoading(true);
    try {

      const imgData = new FormData();
      imgData.append("image", file);

      const imgRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
        { method: "POST", body: imgData }
      );
      const imgJson = await imgRes.json();
      if (!imgJson.success) {
        throw new Error("Image upload failed. Please try again.");
      }
      const imageUrl = imgJson.data.display_url;


      const book = {
        title: formData.get("title"),
        author: formData.get("author"),
        category: formData.get("category"),
        image: imageUrl,
        description: formData.get("description"),
        totalCopies: Number(formData.get("totalCopies")),
        userName: user?.name,
        userEmail: user?.email,
      };

      const res = await authFetch("/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to add book");
      }

      toast.success("Book added successfully!");
      form.reset();
      setPreview(null);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
      <label className="form-control">
        <span className="mb-1 text-sm font-medium">Book Title</span>
        <input name="title" type="text" required placeholder="e.g. Consistency Manager" className="input input-bordered w-full" />
      </label>

      <label className="form-control">
        <span className="mb-1 text-sm font-medium">Author Name</span>
        <input name="author" type="text" required placeholder="e.g. Kazi Fahad" className="input input-bordered w-full" />
      </label>

      <label className="form-control">
        <span className="mb-1 text-sm font-medium">Category</span>
        <select name="category" required defaultValue="" className="select select-bordered w-full">
          <option value="" disabled>Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </label>

      <label className="form-control">
        <span className="mb-1 text-sm font-medium">Total Copies</span>
        <input name="totalCopies" type="number" min="1" required defaultValue="1" className="input input-bordered w-full" />
      </label>

      <label className="form-control md:col-span-2">
        <span className="mb-1 text-sm font-medium">Book Image</span>
        <input
          name="image"
          type="file"
          accept="image/*"
          required
          onChange={handleImageChange}
          className="file-input file-input-bordered w-full"
        />
      </label>

      {preview && (
        <div className="md:col-span-2">
          <img src={preview} alt="Cover preview" className="h-48 rounded-lg border border-base-300 object-cover" />
        </div>
      )}

      <label className="form-control md:col-span-2">
        <span className="mb-1 text-sm font-medium">Short Description</span>
        <textarea name="description" required rows={4} placeholder="What is this book about?" className="textarea textarea-bordered w-full" />
      </label>

      <label className="form-control">
        <span className="mb-1 text-sm font-medium">Your Name</span>
        <input type="text" value={user?.name || ""} readOnly className="input input-bordered w-full bg-base-200" />
      </label>

      <label className="form-control">
        <span className="mb-1 text-sm font-medium">Your Email</span>
        <input type="email" value={user?.email || ""} readOnly className="input input-bordered w-full bg-base-200" />
      </label>

      <div className="md:col-span-2">
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? <span className="loading loading-spinner loading-sm"></span> : "Add Book"}
        </button>
      </div>
    </form>
  );
}