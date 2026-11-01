"use client";

import { authClient } from "@/lib/auth-client";

export default function ProfileCard() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  if (!user) return null;

  return (
    <div className="mx-auto max-w-md rounded-xl border border-base-300 bg-base-100 p-8 text-center shadow-md">
      <img
        src={user.image || "https://placehold.co/160x160?text=U"}
        alt={user.name}
        referrerPolicy="no-referrer"
        className="mx-auto h-32 w-32 rounded-full border-4 border-primary object-cover"
      />
      <h3 className="mt-4 text-2xl font-bold">{user.name}</h3>
      <p className="mt-1 opacity-80">{user.email}</p>
    </div>
  );
}