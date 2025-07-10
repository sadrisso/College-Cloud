import axios from "axios";
import React from "react";

export const getSingleCollege = async (id) => {
  const res = await axios.get(`http://localhost:5000/colleges/${id}`);
  return res?.data;
};

export default async function CollegeDetailsPage({ params }) {
  const { id } = await params;
  const college = await getSingleCollege(id);

  console.log(college);
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-8 py-12 text-gray-800">
      {/* Image and College Name */}
      <div className="flex flex-col lg:flex-row gap-8 mb-10">
        <div className="lg:w-1/2 bg-gray-100 rounded-xl flex items-center justify-center p-6">
          <img
            src={college.image}
            alt={college.name}
            className="h-64 object-contain"
          />
        </div>
        <div className="lg:w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            {college.name}
          </h1>
          <p className="text-gray-600 text-sm mb-2">
            <strong>Location:</strong> {college.location}
          </p>
          <p className="text-gray-600 text-sm mb-2">
            <strong>Website:</strong>{" "}
            <a
              href={college.website}
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {college.website}
            </a>
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Total Students:</strong> {college.totalStudents}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Rating:</strong> ⭐ {college.rating}
          </p>
        </div>
      </div>

      {/* Admission Process */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">🎓 Admission Process</h2>
        <p className="text-sm text-gray-700">{college.admissionProcess}</p>
        <p className="text-sm text-gray-600 mt-2">
          <strong>Fall:</strong> {college.admissionDates.fall},{" "}
          <strong>Spring:</strong>{" "}
          {college.admissionDates.spring || "Not Offered"}
        </p>
      </div>

      {/* Events Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">📅 Events</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          {college.events.map((event, index) => (
            <li key={index}>{event}</li>
          ))}
        </ul>
      </div>

      {/* Research Works */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">🔬 Research Works</h2>
        <p className="text-sm text-gray-700 mb-2">{college.researchHistory}</p>
        <p className="text-sm text-gray-600">
          <strong>Total Publications:</strong> {college.researchCount}
        </p>
      </div>

      {/* Sports Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">🏆 Sports Categories</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          {college.sports.map((sport, i) => (
            <span
              key={i}
              className="bg-green-100 text-green-800 px-3 py-1 rounded-full"
            >
              {sport}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
