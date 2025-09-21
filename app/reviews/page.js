"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AxiosInstance from "@/api/AxiosInstance";
import ProtectedwithAuth from "@/components/ProtectedRoute";

function ReviewsPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    AxiosInstance.get("api/reviews/")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Reviews</h1>
      <div className="space-y-3">
        {reviews.map((review) => (
          <Link
            key={review.id}
            href={`/reviews/${review.id}`}
            className="block p-4 border rounded hover:shadow-md transition"
          >
            <p className="font-semibold">Rating: {review.rating}/5</p>
            <p className="text-gray-600 line-clamp-2">{review.review_text}</p>
            <p className="text-sm text-gray-500">Company ID: {review.company}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProtectedwithAuth(ReviewsPage);
