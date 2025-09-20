"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import AxiosInstance from "@/api/AxiosInstance";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // initial check
    setIsLoggedIn(!!localStorage.getItem("Token"));

    // Listen for localStorage changes (e.g., login from another tab)
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("Token"));
    };
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const logOutUser = async () => {
    try {
      await AxiosInstance.post("logout/", {}); // optional
    } catch (error) {
      console.error("Logout failed:", error);
    }
    localStorage.removeItem("Token");
    setIsLoggedIn(false); // immediately update navbar
    window.location.href = "/";
  };

  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="font-bold text-2xl tracking-wide hover:text-green-100 transition"
        >
          Glassdoor Clone
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="hover:bg-green-700 px-3 py-1 rounded transition"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-white text-green-600 font-medium px-3 py-1 rounded hover:bg-green-100 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={logOutUser}
              className="bg-white text-green-600 font-medium px-3 py-1 rounded hover:bg-green-100 transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-green-700 flex flex-col space-y-2 px-4 pb-4">
          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="block hover:bg-green-800 px-3 py-2 rounded transition"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="block bg-white text-green-600 font-medium px-3 py-2 rounded hover:bg-green-100 transition"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                logOutUser();
                setMenuOpen(false);
              }}
              className="block bg-white text-green-600 font-medium px-3 py-2 rounded hover:bg-green-100 transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
