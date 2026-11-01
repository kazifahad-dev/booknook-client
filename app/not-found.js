import Link from "next/link";
import { FaBookOpen } from "react-icons/fa";

export const metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
      <FaBookOpen className="text-5xl text-primary" />
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-2xl font-bold">This page is not on our shelf</h2>
      <p className="opacity-80">
        The page you are looking for may have been moved, or the link may be wrong.
      </p>
      <Link href="/" className="btn btn-primary mt-2">
        Back to Home
      </Link>
    </div>
  );
}