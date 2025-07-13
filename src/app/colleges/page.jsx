import axios from "axios";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "All Colleges",
};

const getColleges = async () => {
  try {
    const res = await axios.get("http://localhost:5000/colleges");
    return res.data;
  } catch (error) {
    console.error("Axios error:", error.response?.data || error.message);
    throw error;
  }
};

export default async function CollegesPage() {
  const colleges = await getColleges();

  return (
    <div className="text-black">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 sm:p-8 bg-gray-50 min-h-screen">
        {colleges.map((college) => (
          <div
            key={college?._id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden transition hover:shadow-xl border border-gray-200"
          >
            <img
              src={college?.image}
              alt={college?.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-gray-800">
                {college?.name}
              </h3>
              <p>
                📅 Admission: Fall - {college.admissionDates.fall}, Spring -{" "}
                {college.admissionDates.spring}
              </p>
              <p className="text-sm text-gray-600">
                📚 Research History: {college?.researchHistory}
              </p>
              <p className="text-yellow-500 text-sm flex items-center gap-1">
                ⭐ {college.ranking} / 10
              </p>
              <Link
                href={`/colleges/${college?._id}`}
                rel="noopener noreferrer"
                className="text-sm mt-auto w-fit bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
