"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBookOpen } from "react-icons/fa";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
];

const privateLinks = [
  { href: "/add-book", label: "Add Book" },
  { href: "/my-books", label: "My Books" },
  { href: "/my-borrows", label: "My Borrows" },
];

export default function Navbar() {
  const pathname = usePathname();

  // আপাতত কেউ লগইন করা নেই। BetterAuth বসালে এখানে আসল ইউজার আসবে
  const user = null;

  // লগইন থাকলে সব লিংক, না থাকলে শুধু পাবলিক লিংক
  const links = user ? [...publicLinks, ...privateLinks] : publicLinks;

  const navItems = links.map((link) => (
    <li key={link.href}>
      <Link
        href={link.href}
        className={pathname === link.href ? "font-bold text-primary" : ""}
      >
        {link.label}
      </Link>
    </li>
  ));

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-4 lg:px-8">
      {/* বাঁ দিক: মোবাইল মেনু + লোগো */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
            {navItems}
          </ul>
        </div>
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <FaBookOpen className="text-primary" />
          BookNook
        </Link>
      </div>

      {/* মাঝখান: বড় স্ক্রিনের লিংক */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>

      {/* ডান দিক: লগইন করা থাকলে ছবি, না থাকলে বাটন */}
      <div className="navbar-end gap-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.image} alt={user.name} />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
              <li className="px-3 py-2 font-semibold">{user.name}</li>
              <li><Link href="/profile">My Profile</Link></li>
              <li><button>Logout</button></li>
            </ul>
          </div>
        ) : (
          <>
            <Link href="/login" className="btn btn-outline btn-primary btn-sm">Login</Link>
            <Link href="/register" className="btn btn-primary btn-sm">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}