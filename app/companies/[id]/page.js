"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProtectedwithAuth from "@/components/ProtectedRoute";
import AxiosInstance from "@/api/AxiosInstance";
import { FaStar } from "react-icons/fa";

function CompanyDetailPage() {
  const params = useParams();
  const companyId = params?.id;

  const [company, setCompany] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [companyRes, userRes, jobsRes, reviewsRes] = await Promise.all([
          AxiosInstance.get(`api/companies/${companyId}/`),
          AxiosInstance.get("api/users/me/"),
          AxiosInstance.get(`api/jobs/?company=${companyId}`),
          AxiosInstance.get(`api/reviews/?company=${companyId}`),
        ]);

        setCompany(companyRes.data);
        setCurrentUser(userRes.data);
        setJobs(jobsRes.data);
        setReviews(reviewsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (companyId) fetchData();
  }, [companyId]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!company) return <p className="p-6 text-red-600">Company not found.</p>;

  const isOwner = currentUser?.id === company.created_by;

  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`h-5 w-5 ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50">
      {/* Company Header */}
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-6 mb-8">
        <h1 className="text-4xl font-semibold text-gray-800">{company.name}</h1>
        <p className="text-lg text-gray-600">{company.location}</p>
        <p className="mt-4 text-gray-700">{company.description}</p>

        {isOwner && (
          <div className="mt-6">
            <Link
              href={`/companies/${companyId}/jobs/create`}
              className="bg-green-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-700 transition duration-300"
            >
              + Post a Job
            </Link>
          </div>
        )}
      </div>

      {/* Jobs Section */}
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Jobs at {company.name}
        </h2>
        {jobs?.length ? (
          <ul className="space-y-4">
            {jobs.map((job) => (
              <li
                key={job.id}
                className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition duration-200"
              >
                <h3 className="text-xl font-medium text-gray-800">{job.title}</h3>
                <p className="text-gray-600">{job.location}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No jobs posted yet.</p>
        )}
      </div>

      {/* Reviews Section */}
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reviews</h2>

        {!isOwner && currentUser && (
          <Link
            href={`/companies/${companyId}/reviews/create`}
            className="inline-block mb-4 bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition duration-300"
          >
            Write a Review
          </Link>
        )}

        {reviews?.length ? (
          <ul className="space-y-4">
            {reviews.map((rev) => (
              <li
                key={rev.id}
                className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition duration-200"
              >
                {/* Star rating */}
                {renderStars(rev.rating)}

                <p className="mt-2 text-gray-700">{rev.review_text}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
}

export default ProtectedwithAuth(CompanyDetailPage);
