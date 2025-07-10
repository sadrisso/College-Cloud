"use client"
import useAuth from "@/hooks/useAuth";
import React from "react";

export default function AboutPage() {

  const { user } = useAuth();

  console.log("User here --> ", user)
  return <div></div>;
}
