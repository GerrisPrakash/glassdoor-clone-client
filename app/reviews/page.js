"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaStar, FaRegStar } from "react-icons/fa";
import AxiosInstance from "@/api/AxiosInstance";
import ProtectedwithAuth from "@/components/ProtectedRoute";

function StarRating({ rating }) {
  return (
    <div className="flex items-center space-x-1 text-yellow-400">
      {[...Array(rating)].map((_, i) => (
        <FaStar key={`full-${i}`} />
      ))}
      {[...Array(5 - rating)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} />
      ))}
    </div>
  );
}

function ReviewsPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    AxiosInstance.get("api/reviews/")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Reviews</h1>
      {reviews.length === 0 && <p>No reviews found.</p>}
      <div className="space-y-6">
        {reviews.map((review) => (
          <Link
            key={review.id}
            href={`/reviews/${review.id}`}
            className="block p-6 border rounded-lg shadow-sm hover:shadow-lg transition duration-200 bg-white"
          >
            <div className="flex items-center justify-between mb-2">
              <StarRating rating={review.rating} />
              <span className="text-gray-600 text-sm">
                by <strong>{review.user_name || "Anonymous"}</strong>
              </span>
            </div>
            <p className="text-gray-700 mb-2 line-clamp-3">{review.review_text}</p>
            <p className="text-gray-500 text-sm font-medium">{review.company_name || "Unknown Company"}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProtectedwithAuth(ReviewsPage);
