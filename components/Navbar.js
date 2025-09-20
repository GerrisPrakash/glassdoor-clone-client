"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link href="/" className="font-bold text-xl">Glassdoor Clone</Link>
      <div className="space-x-4">
        <Link href="/login" className="hover:underline">Sign In</Link>
        <Link href="/register" className="hover:underline">Sign Up</Link>
      </div>
    </nav>
  );
}
