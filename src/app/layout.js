"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import Footer from "@/components/Footer";

export const AuthContext = createContext();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User here -->", user);
        setUser(user);
      } else {
        console.log("User is not logged in -->", user);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = { user, createUser, loginUser, logOut };

  return (
    <html lang="en">
      <body
        className={`p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
      >
        <AuthContext.Provider value={authInfo}>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#333",
                color: "#fff",
                fontSize: "14px",
                padding: "12px 16px",
                borderRadius: "8px",
              },
            }}
          />
          <div className="min-h-screen flex flex-col mt-10 sm:mt-0">
            <Navbar />

            {/* Content in the middle */}
            <main className="flex-1 flex justify-center items-left p-4 bg-white">
              <div className="w-full max-w-5xl">{children}</div>
            </main>

            <Footer />
          </div>
        </AuthContext.Provider>
      </body>
    </html>
  );
}
