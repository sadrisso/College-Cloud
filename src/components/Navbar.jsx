"use client";
import useAuth from "@/hooks/useAuth";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(true);
  const { user, logOut } = useAuth();
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged Out Successful");
        router.push("/login");
      })
      .catch((err) => {
        toast.error(err?.message || "Logout Error!!");
      });
  };

  return (
    <div>
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="text-xl font-bold text-gray-800">CollegeCloud</div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6">
              <Link href="/" className="text-gray-700 hover:text-blue-500">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-500">
                About
              </Link>
              {user ? (
                <button onClick={handleLogout} className="text-red-500">
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-blue-500"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Toggle Button */}
            <div className="md:hidden text-blue-800">
              <button onClick={toggleMenu}>
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Menu */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
        >
          <div className="p-5 flex flex-col gap-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-500"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-500"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              href="/login"
              className="text-gray-700 hover:text-blue-500"
              onClick={toggleMenu}
            >
              Login
            </Link>
          </div>
        </div>

        {/* Overlay */}
        {isOpen && (
          <div
            onClick={toggleMenu}
            className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
          />
        )}
      </nav>
    </div>
  );
}
