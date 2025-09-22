"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ProtectedwithAuth from "@/components/ProtectedRoute";
import AxiosInstance from "@/api/AxiosInstance";
import { FaStar } from "react-icons/fa"; // Star icon from react-icons

function CreateReviewPage() {
  const params = useParams();
  const router = useRouter();
  const companyId = params?.id;

  const [currentUser, setCurrentUser] = useState(null);
  const [company, setCompany] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState("");

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

  const isOwner = currentUser?.id === company?.created_by;

  const validate = () => {
    const errors = {};
    if (rating < 1 || rating > 5) errors.rating = "Please select a rating.";
    if (!reviewText.trim()) errors.reviewText = "Review cannot be empty.";
    else if (reviewText.trim().length < 20)
      errors.reviewText = "Review must be at least 20 characters.";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError("");

    if (!validate()) return;

    setSubmitting(true);
    try {
      await AxiosInstance.post("api/reviews/", {
        company: companyId,
        rating,
        review_text: reviewText.trim(),
      });
      router.push(`/companies/${companyId}`);
    } catch (err) {
      console.error(err);
      setGlobalError("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!company) return <p className="p-6 text-red-600">Company not found.</p>;
  if (isOwner)
    return (
      <p className="p-6 text-red-600">
        You cannot submit a review for your own company.
      </p>
    );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Write a Review for {company.name}
        </h1>

        {globalError && <p className="text-red-600 mb-4">{globalError}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Star Rating */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Rating
            </label>
            <div className="flex gap-1 text-2xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none"
                >
                  <FaStar
                    className={`transition-colors ${
                      (hoverRating || rating) >= star
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            {fieldErrors.rating && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.rating}</p>
            )}
          </div>

          {/* Review Text */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Review
            </label>
            <textarea
              value={reviewText}
              onChange={(e) => {
                setReviewText(e.target.value);
                setFieldErrors((prev) => ({ ...prev, reviewText: "" }));
              }}
              rows={6}
              className={`w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                fieldErrors.reviewText ? "border-red-500" : "focus:ring-blue-500"
              }`}
              placeholder="Share details about your experience..."
            />
            {fieldErrors.reviewText && (
              <p className="text-red-500 text-sm mt-1">
                {fieldErrors.reviewText}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProtectedwithAuth(CreateReviewPage);
