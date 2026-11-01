"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import PasswordInput from "@/components/PasswordInput";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  // ইউজার যে পেজে যেতে চেয়েছিল, লগইনের পর সেখানে ফেরানো হবে
  const redirect = searchParams.get("redirect") || "/";
  const redirectTo = redirect.startsWith("/") ? redirect : "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Invalid email or password");
      return;
    }

    toast.success("Login successful!");
    router.push(redirectTo);
    router.refresh();
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md items-center px-4 py-12">
      <div className="card w-full border border-base-300 bg-base-100 shadow-md">
        <form onSubmit={handleSubmit} className="card-body gap-4">
          <h2 className="text-center text-3xl font-bold">Welcome Back</h2>

          <label className="form-control">
            <span className="mb-1 text-sm font-medium">Email</span>
            <input name="email" type="email" required placeholder="you@example.com" className="input input-bordered w-full" />
          </label>

          <div className="form-control">
            <span className="mb-1 text-sm font-medium">Password</span>
            <PasswordInput placeholder="Your password" />
            <span className="mt-1 text-right text-sm text-primary">Forget Password?</span>
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? <span className="loading loading-spinner loading-sm"></span> : "Login"}
          </button>

          <p className="text-center text-sm">
            New to BookNook?{" "}
            <Link href="/register" className="font-semibold text-primary">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}