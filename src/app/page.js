/* eslint-disable @next/next/no-img-element */
"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const getCollegeData = async () => {
  const res = await axios.get("http://localhost:5000/colleges");
  return res?.data;
};

function truncate(text, length = 100) {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

export default function Home() {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    getCollegeData().then((res) => {
      const firstThree = res.slice(0, 3);
      setColleges(firstThree);
    });
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-10 text-center text-gray-900">
        Featured Colleges
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {colleges.map((college) => (
          <div
            key={college.name}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
          >
            <img
              src={college.image}
              alt={college.name}
              className="h-48 w-full object-cover bg-gray-100 p-6"
            />

            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {college.name}
              </h3>

              <p className="text-sm text-gray-600 mb-3">
                <strong>Admission:</strong>{" "}
                {`Fall: ${college.admissionDates.fall}, Spring: ${
                  college.admissionDates.spring || "N/A"
                }`}
              </p>

              <div className="mb-3">
                <strong className="text-gray-700">Events:</strong>
                <div className="flex flex-wrap gap-2 mt-1">
                  {college.events.slice(0, 4).map((event, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full"
                    >
                      {event}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-gray-700 flex-grow mb-3">
                <strong>Research History: </strong>
                {truncate(college.researchHistory, 110)}
              </p>

              <div>
                <strong className="text-gray-700">Sports:</strong>
                <div className="flex flex-wrap gap-3 mt-1 text-sm text-gray-600">
                  {college.sports.map((sport, i) => (
                    <span
                      key={i}
                      className="bg-green-100 px-2 py-1 rounded-md"
                      title={sport}
                    >
                      {sport}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
