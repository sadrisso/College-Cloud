import axios from "axios";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Admission",
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

export default async function AdmissionPage() {
  const colleges = await getColleges();

  return (
    <div>
      <main className="mx-auto p-6 text-gray-500">
        <h1 className="text-gray-600 text-4xl font-bold mb-8 text-center">
          Admission
        </h1>
        <h2 className="text-2xl mb-6">Select a College:</h2>
        <ul className="space-y-4">
          {colleges && colleges.length > 0 ? (
            colleges.map((college) => (
              <Link key={college._id} href={`/admission/${college?._id}`}>
                <li
                  className="p-4 border rounded cursor-pointer hover:bg-blue-50 transition my-2"
                  // You can add onClick here to handle selection later
                >
                  {college.name}
                </li>
              </Link>
            ))
          ) : (
            <li>No colleges found.</li>
          )}
        </ul>
      </main>
    </div>
  );
}
