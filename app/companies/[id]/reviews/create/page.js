"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ProtectedwithAuth from "@/components/ProtectedRoute";
import AxiosInstance from "@/api/AxiosInstance";

function CreateReviewPage() {
  const params = useParams();
  const router = useRouter();
  const companyId = params?.id;

  const [currentUser, setCurrentUser] = useState(null);
  const [company, setCompany] = useState(null);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [userRes, companyRes] = await Promise.all([
          AxiosInstance.get("api/users/me/"),
          AxiosInstance.get(`api/companies/${companyId}/`),
        ]);
        setCurrentUser(userRes.data);
        setCompany(companyRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (companyId) fetchData();
  }, [companyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.post("api/reviews/", {
        company: companyId,
        rating,
        review_text: reviewText,
      });
      router.push(`/companies/${companyId}`); // redirect to company detail
    } catch (err) {
      console.error(err);
      alert("Failed to submit review.");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!company) return <p className="p-6 text-red-600">Company not found.</p>;

  // Optionally, prevent company owners from reviewing their own company
  const isOwner = currentUser?.id === company?.created_by;
  if (isOwner)
    return (
      <p className="p-6 text-red-600">
        You cannot submit a review for your own company.
      </p>
    );

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Write a Review for {company.name}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Rating (1–5)</label>
          <select
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            className="border px-2 py-1 rounded w-full"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows={5}
            className="w-full border px-2 py-1 rounded"
            placeholder="Write your review here..."
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default ProtectedwithAuth(CreateReviewPage);
