"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import PasswordInput from "@/components/PasswordInput";

function validatePassword(password) {
  if (!/[A-Z]/.test(password)) return "Password must have an uppercase letter";
  if (!/[a-z]/.test(password)) return "Password must have a lowercase letter";
  if (password.length < 6) return "Password must be at least 6 characters long";
  return "";
}

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const photo = formData.get("photo");
    const password = formData.get("password");

    const error = validatePassword(password);
    setPasswordError(error);
    if (error) return;

    setLoading(true);
    const { error: signUpError } = await authClient.signUp.email({
      name,
      email,
      password,
      image: photo,
    });
    setLoading(false);

    if (signUpError) {
      toast.error(signUpError.message || "Registration failed");
      return;
    }

    toast.success("Registration successful! Please login.");
    router.push("/login");
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md items-center px-4 py-12">
      <div className="card w-full border border-base-300 bg-base-100 shadow-md">
        <form onSubmit={handleSubmit} className="card-body gap-4">
          <h2 className="text-center text-3xl font-bold">Create Account</h2>

          <label className="form-control">
            <span className="mb-1 text-sm font-medium">Name</span>
            <input name="name" type="text" required placeholder="Your full name" className="input input-bordered w-full" />
          </label>

          <label className="form-control">
            <span className="mb-1 text-sm font-medium">Email</span>
            <input name="email" type="email" required placeholder="you@example.com" className="input input-bordered w-full" />
          </label>

          <label className="form-control">
            <span className="mb-1 text-sm font-medium">Photo URL</span>
            <input name="photo" type="url" required placeholder="https://..." className="input input-bordered w-full" />
          </label>

          <div className="form-control">
            <span className="mb-1 text-sm font-medium">Password</span>
            <PasswordInput placeholder="Create a password" />
            {passwordError && <span className="mt-1 text-sm text-error">{passwordError}</span>}
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? <span className="loading loading-spinner loading-sm"></span> : "Register"}
          </button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}