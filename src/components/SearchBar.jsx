import React, { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div className="bg-white w-full px-2 sm:px-4 py-2 sm:py-4 border">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center gap-3 max-w-3xl mx-auto"
      >
        <input
          type="text"
          placeholder="Search colleges..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full sm:flex-1 px-4 py-2 border border-gray-300 text-gray-500 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
        />
        <button
          type="submit"
          className="px-4 text-xs sm:text-lg sm:px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>
    </div>
  );
}
