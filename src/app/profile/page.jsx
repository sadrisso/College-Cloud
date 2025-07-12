"use client";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { user, logOut } = useAuth();
  const router = useRouter();

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

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading user information...
      </div>
    );
  }

  const { displayName, email, photoURL } = user;

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        User Profile
      </h1>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Profile Image */}
        <div className="w-32 h-32 rounded-full overflow-hidden border shadow">
          <img
            src={
              photoURL ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt={displayName || "User Photo"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Info */}
        <div className="flex-1 space-y-2 text-center sm:text-left">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {displayName || "No Name Provided"}
            </h2>
            <p className="text-gray-600">{email}</p>
          </div>

          <div className="mt-4">
            <a
              href="/"
              className="inline-block px-5 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition"
            >
              Back to Home
            </a>
          </div>
          <div className="mt-4">
            <a
              onClick={handleLogout}
              className="cursor-pointer inline-block px-5 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700 transition"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
