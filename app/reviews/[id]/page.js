"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AxiosInstance from "@/api/AxiosInstance";
import ProtectedwithAuth from "@/components/ProtectedRoute";


function ReviewDetailPage() {
  const { id } = useParams();
  const [review, setReview] = useState(null);

  useEffect(() => {
    if (!id) return;
    AxiosInstance.get(`api/reviews/${id}/`)
      .then((res) => setReview(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!review) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Review Detail</h1>
      <p className="font-semibold mb-1">Rating: {review.rating}/5</p>
      <p className="mb-3">{review.review_text}</p>
      <p className="text-sm text-gray-500">Company ID: {review.company}</p>
      <p className="text-sm text-gray-500">User ID: {review.user}</p>
    </div>
  );
}

export default ProtectedwithAuth(ReviewDetailPage);
