"use client";
import useAuth from "@/hooks/useAuth";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(true);
   const [isHovered, setIsHovered] = useState(false);
  const pathName = usePathname();
  const { user } = useAuth();
  

  const toggleMenu = () => setIsOpen(!isOpen);
  const isActive = (path) => pathName === path;

  return (
    <div>
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold text-gray-800">
              CollegeCloud
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6">
              <Link
                href="/"
                className={`hover:text-blue-500 ${
                  isActive("/")
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700"
                }`}
              >
                Home
              </Link>
              <Link
                href="/colleges"
                className={`hover:text-blue-500 ${
                  isActive("/colleges")
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700"
                }`}
              >
                Colleges
              </Link>
              <Link
                href="/admission"
                className={`hover:text-blue-500 ${
                  isActive("/admission")
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700"
                }`}
              >
                Admission
              </Link>
              <Link
                href="/my-college"
                className={`hover:text-blue-500 ${
                  isActive("/my-college")
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700"
                }`}
              >
                My College
              </Link>
              {user ? (
                <div
                  className="relative group"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Link
                    href="/profile"
                    className="text-blue-600 font-medium hover:underline flex items-center gap-2"
                  >
                    👤 Profile
                  </Link>

                  {/* Tooltip */}
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 mt-2 z-50 w-64 p-3 bg-white text-sm rounded shadow-lg border border-gray-200 transition-opacity duration-300 ${
                      isHovered ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                  >
                    <p>
                      <span className="font-semibold text-gray-700">Name:</span>{" "}
                      {user.displayName || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-700">
                        Email:
                      </span>{" "}
                      {user.email || "N/A"}
                    </p>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  className={`hover:text-blue-500 ${
                    isActive("/login")
                      ? "text-blue-600 font-semibold"
                      : "text-gray-700"
                  }`}
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
          <div className="flex flex-col gap-4 p-5 text-gray-700">
            <Link
              href="/"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/colleges"
              onClick={toggleMenu}
              className={`hover:text-blue-500 ${
                isActive("/colleges")
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              Colleges
            </Link>
            <Link
              href="/admission"
              onClick={toggleMenu}
              className={`hover:text-blue-500 ${
                isActive("/admisson")
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              Admission
            </Link>
            <Link
              href="/my-college"
              onClick={toggleMenu}
              className={`hover:text-blue-500 ${
                isActive("/my-college")
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              My College
            </Link>
            {user ? (
              <Link onClick={toggleMenu} className="text-black" href="/profile">
                {user?.displayName || "Profile"}
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={toggleMenu}
                className={`hover:text-blue-500 ${
                  isActive("/login")
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700"
                }`}
              >
                Login
              </Link>
            )}
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
      {/* <SearchBar />  */}
    </div>
  );
}
