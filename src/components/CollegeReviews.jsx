import React from "react";

const reviews = [
  {
    id: 1,
    name: "Sarah Williams",
    college: "Greenfield University",
    rating: 5,
    comment: "Amazing faculty and great campus facilities. Highly recommend!",
  },
  {
    id: 2,
    name: "John Doe",
    college: "Tech Valley Institute",
    rating: 4,
    comment:
      "Very supportive environment, but could improve on library resources.",
  },
  {
    id: 3,
    name: "Anika Rahman",
    college: "Riverdale College",
    rating: 5,
    comment: "Excellent research opportunities and helpful staff!",
  },
];

export default function CollegeReviews() {
  return (
    <div>
      <section className="bg-gray-50 py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
            🗣️ Student Reviews & Feedback
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map(({ id, name, college, rating, comment }) => (
              <div
                key={id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {name}
                  </h3>
                  <p className="text-sm text-gray-500">{college}</p>
                </div>
                
                <p className="text-gray-700 italic">"{comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
