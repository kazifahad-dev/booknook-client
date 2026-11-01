import { authClient } from "@/lib/auth-client";


export async function authFetch(path, options = {}) {
  const { data } = await authClient.token();
  const token = data?.token;

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });
}