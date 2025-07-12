"use client"
import React, { useEffect, useState } from "react";

export default function SearchBar() {
  const [search, serSearch] = useState("");
  const [colleges, setColleges] = useState([]);

  const getCollegeData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/colleges?search=${search}`);
      setColleges(res.data);
    } catch (error) {
      console.error("Axios error:", error.response?.data || error.message);
      throw error;
    }
  };

  useEffect(() => {
    getCollegeData()
  }, [search])



  return (
    <div className="bg-white w-full px-2 sm:px-4 py-2 sm:py-4 border">
        <input
          type="text"
          placeholder="Search colleges..."
          value={search}
          onChange={(e) => serSearch(e.target.value)}
          className="w-full sm:flex-1 px-4 py-2 border border-gray-300 text-gray-500 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
        />
    </div>
  );
}
