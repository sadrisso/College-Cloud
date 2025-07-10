"use client";
import useAuth from "@/hooks/useAuth";
import React from "react";

export default function AboutPage() {
  const authInfo = useAuth();

  if (!authInfo) {
    return <p>context not available</p>;
  }

  const { user } = authInfo;

  return (
    <div className="p-6">
      {user ? <h1>Welcome {user.displayName}</h1> : <p>User not logged in.</p>}
    </div>
  );
}
