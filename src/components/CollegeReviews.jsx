import axios from "axios";
import React, { useEffect, useState } from "react";

export default function CollegeReviews() {
  const [isLoading, setIsLoading] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/reviews");
        setReviews(res?.data);
      } catch (error) {
        console.error("Axios error:", error.response?.data || error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-gray-50 py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
            🗣️ Student Reviews & Feedback
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map(({ _id, reviewerName, college, rating, message }) => (
              <div
                key={_id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {reviewerName}
                  </h3>
                  <p className="text-sm text-gray-500">{college}</p>
                  <p className="text-sm text-yellow-500">
                    {Array.from({ length: Number(rating) }, (_, i) => (
                      <span key={i}>★</span>
                    ))}
                    <span className="text-gray-400">
                      {Array.from({ length: 5 - Number(rating) }, (_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </span>
                  </p>
                </div>

                <p className="text-gray-700 italic">"{message}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
