"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AxiosInstance from "@/api/AxiosInstance";
import ProtectedwithAuth from "@/components/ProtectedRoute";
import { FaStar } from "react-icons/fa";

function ReviewDetailPage() {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    AxiosInstance.get(`api/reviews/${id}/`)
      .then((res) => setReview(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-6">Loading review...</p>;
  if (!review) return <p className="p-6 text-red-600">Review not found.</p>;

  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1 text-yellow-500">
        {Array.from({ length: rating }, (_, i) => (
          <FaStar key={i} />
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Review for {review.company_name}
        </h1>

        <div className="mb-3">
          <p className="font-medium text-gray-700 mb-1">Rating:</p>
          {renderStars(review.rating)}
        </div>

        <div className="mb-4">
          <p className="font-medium text-gray-700 mb-1">Review:</p>
          <p className="text-gray-800">{review.review_text}</p>
        </div>

        <hr className="my-4" />

        <div className="text-sm text-gray-500">
          <p>Written by: <span className="font-medium">{review.user_name}</span></p>
          <p>Reviewed on: {new Date(review.created_at).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export default ProtectedwithAuth(ReviewDetailPage);
