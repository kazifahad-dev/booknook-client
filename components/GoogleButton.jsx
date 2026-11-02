"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

export default function GoogleButton({ callbackURL = "/" }) {
  const [loading, setLoading] = useState(false);

  const handleGoogle = async () => {
    setLoading(true);
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL,
    });

   
    if (error) {
      toast.error(error.message || "Google login failed");
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogle}
      disabled={loading}
      className="btn btn-outline w-full"
    >
      {loading ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        <>
          <FcGoogle className="text-xl" />
          Continue with Google
        </>
      )}
    </button>
  );
}