"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-200 text-gray-700 p-4 text-center mt-auto">
      &copy; {new Date().getFullYear()} Glassdoor Clone. All rights reserved.
    </footer>
  );
}
