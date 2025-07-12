"use client";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MyCollegePage() {
  const { user } = useAuth();
  const [admission, setAdmission] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("");

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      reviewerName: user?.displayName,
      reviewerEmail: user?.email,
      rating: parseInt(rating),
      message: reviewText,
    };

    try {
      const res = await axios.post("http://localhost:5000/reviews", reviewData);
      if (res?.data?.insertedId) {
        toast.success("Review added successfully!");
        setReviewText("");
        setRating("");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      toast.error("Error posting review");
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchAdmission = async () => {
      if (!user?.email) return;

      try {
        const res = await axios.get(
          `http://localhost:5000/admissions?email=${user.email}`
        );
        setAdmission(res.data);
        console.log(`Admission data for ${user.email}:`, res.data);
      } catch (error) {
        console.error("Axios error:", error.response?.data || error.message);
      }
    };

    fetchAdmission();
  }, [user?.email]);

  return (
    <>
      {admission && admission.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {admission.map((candidate, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-lg transition"
              >
                {/* College Banner */}
                <div className="h-32 sm:h-40 md:h-48 overflow-hidden bg-gray-200">
                  <img
                    src={candidate?.collegeImage}
                    alt={candidate?.collegeName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Candidate Info */}
                <div className="p-4 flex flex-col gap-3">
                  {/* Candidate Image and Name */}
                  <div className="flex items-center gap-4">
                    <img
                      src={`http://localhost:5000${candidate?.imageUrl}`}
                      alt={candidate?.candidateName}
                      className="w-20 h-20 rounded border object-cover"
                    />
                    <div>
                      <h2 className="text-lg font-bold text-gray-800">
                        {candidate?.candidateName}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {candidate?.email}
                      </p>
                    </div>
                  </div>

                  <hr className="my-2" />

                  {/* College Info */}
                  <div className="space-y-1">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">College:</span>{" "}
                      {candidate?.collegeName}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Subject:</span>{" "}
                      {candidate?.subject}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Phone:</span>{" "}
                      {candidate?.phoneNumber || "N/A"}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Address:</span>{" "}
                      {candidate?.address || "N/A"}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Date of Birth:</span>{" "}
                      {candidate?.dob || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          //review
          <div className="mt-6 border-t pt-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Add Your Review
            </h2>
            <form
              onSubmit={handleReviewSubmit}
              className="space-y-3 text-gray-600"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rating (1–5)
                </label>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  required
                  className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-400"
                >
                  <option value="">Select rating</option>
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>
                      {r} Star{r > 1 && "s"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Your Review
                </label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows={4}
                  required
                  className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-400"
                  placeholder="Share your experience..."
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-center bg-white p-6 rounded shadow">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            No Admission Records Found
          </h2>
          <p className="text-gray-600 mb-6">
            It looks like you haven’t taken admission yet. Join your dream
            college now!
          </p>
          <a
            href="/admission"
            className="inline-block px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded transition"
          >
            Take Admission
          </a>
        </div>
      )}
    </>
  );
}
