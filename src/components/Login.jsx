"use client";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const { loginUser, user } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user) {
      toast.error("You're already logged in. Please log out first.");
      return;
    }

    loginUser(formData?.email, formData?.password)
      .then((res) => {
        console.log("Successfully Logged In", res?.user);
        toast.success("Successfully Logged In");
        router.push("/");
      })
      .catch((err) => {
        console.log("Login Error!!", err?.message);
        toast.error(err?.message || "Login failed");
      });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm mx-auto"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-500">Login</h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="you@example.com"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="********"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
