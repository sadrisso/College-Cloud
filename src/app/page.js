"use client";
import CollegeGallery from "@/components/CollegeGallary";
import CollegeReviews from "@/components/CollegeReviews";
import ResearchPapers from "@/components/ResearchPapers";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [search, serSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/colleges", {
          params: { search },
        });

        const firstThree = res.data.slice(0, 3);
        setColleges(firstThree);
      } catch (error) {
        console.error("Axios error:", error.response?.data || error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [search]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white w-full px-2 sm:px-4 py-2 sm:py-4 border">
        <input
          type="text"
          placeholder="Search colleges..."
          value={search}
          onChange={(e) => serSearch(e.target.value)}
          className="w-full sm:flex-1 px-4 py-2 border border-gray-300 text-gray-500 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-8 py-12 bg-gray-50">
        {colleges.map((college) => (
          <div
            key={college.name}
            className="flex flex-col bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
          >
            {/* Image */}
            <div className="bg-gray-100 flex justify-center items-center p-6 h-48 sm:h-56">
              <Image
                width={400}
                height={400}
                src={college.image}
                alt={college.name}
                className="object-contain h-full"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col justify-between h-full">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                {college.name}
              </h2>

              {/* Admission Dates */}
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium text-gray-700">Admission:</span>{" "}
                Fall {college.admissionDates.fall} | Spring{" "}
                {college.admissionDates.spring || "N/A"}
              </p>

              {/* Events */}
              <div className="mb-2">
                <p className="font-medium text-gray-700">Events:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {college.events.slice(0, 3).map((event, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {event}
                    </span>
                  ))}
                </div>
              </div>

              {/* Research */}
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-medium">Research:</span>{" "}
                {college.researchHistory.slice(0, 80)}...
              </p>

              {/* Sports */}
              <div className="mb-4">
                <p className="font-medium text-gray-700">Sports:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {college.sports.map((sport, i) => (
                    <span
                      key={i}
                      className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
                    >
                      {sport}
                    </span>
                  ))}
                </div>
              </div>

              {/* Button or Link (Optional) */}
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
      <section className="mt-10">
        <CollegeGallery />
      </section>

      <section className="mt-10">
        <ResearchPapers />
      </section>

      <section className="mt-10">
        <CollegeReviews />
      </section>
    </>
  );
}
