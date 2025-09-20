"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import AxiosInstance from "@/api/AxiosInstance";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Companies", href: "/companies" },
    { label: "Jobs", href: "/jobs" },
    { label: "Reviews", href: "/reviews" },
  ];

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("Token"));
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("Token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const logOutUser = async () => {
    try {
      await AxiosInstance.post("logout/", {});
    } catch (error) {
      console.error("Logout failed:", error);
    }
    localStorage.removeItem("Token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8 py-3">
        {/* Left: Logo */}
        <div className="flex-1">
          <Link
            href="/"
            className="font-bold text-2xl tracking-wide text-green-600 hover:text-green-700 transition"
          >
            Glassdoor Clone
          </Link>
        </div>

        {/* Center: Nav Items */}
        <div className="hidden md:flex flex-1 justify-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-gray-900 font-medium text-lg pb-2 transition 
                         border-b-4 border-transparent hover:border-green-600 hover:text-green-600"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right: Auth Buttons */}
        <div className="hidden md:flex flex-1 justify-end items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="text-gray-700 hover:text-green-600 px-3 py-1"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={logOutUser}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200 flex flex-col px-4 pb-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-2 text-gray-900 font-medium text-lg transition 
                         border-b-4 border-transparent hover:border-green-600 hover:text-green-600"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="py-2 text-gray-700 hover:text-green-600"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
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
              className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
