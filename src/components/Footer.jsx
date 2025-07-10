import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-5">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} MyCollegeApp. All rights reserved.
        </p>

        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="/about" className="hover:text-white transition">
            About
          </Link>
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>
          <Link href="/privacy" className="hover:text-white transition">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
