import Link from "next/link";
import { FaBookOpen, FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-base-200 mt-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3 lg:px-8">
        <div>
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <FaBookOpen className="text-primary" />
            BookNook
          </Link>
          <p className="mt-3 text-sm opacity-80">
            A small online library where you can add a book, borrow a book and
            return it when you are done.
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-semibold">Contact</h3>
          <ul className="space-y-1 text-sm opacity-80">
            <li>hello@booknook.com</li>
            <li>+880 1XXX-XXXXXX</li>
            <li>Dhaka, Bangladesh</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-semibold">Follow us</h3>
          <div className="flex gap-3">
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X" className="btn btn-circle btn-sm btn-outline"><FaXTwitter /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="btn btn-circle btn-sm btn-outline"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="btn btn-circle btn-sm btn-outline"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-base-300 py-4 text-center text-sm opacity-70">
        © {new Date().getFullYear()} BookNook. All rights reserved.
      </div>
    </footer>
  );
}