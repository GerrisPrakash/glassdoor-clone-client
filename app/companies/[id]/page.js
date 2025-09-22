"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProtectedwithAuth from "@/components/ProtectedRoute";
import AxiosInstance from "@/api/AxiosInstance";

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

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{company.name}</h1>
      <p className="text-gray-600">{company.location}</p>
      <p className="mt-4">{company.description}</p>

      {/* Post Job button for company owner */}
      {isOwner && (
        <div className="mt-6">
          <Link
            href={`/companies/${companyId}/jobs/create`}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            + Post a Job
          </Link>
        </div>
      )}

      {/* Jobs */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Jobs</h2>
        {jobs?.length ? (
          <ul className="space-y-3">
            {jobs.map((job) => (
              <li key={job.id} className="p-4 border rounded-lg">
                <h3 className="text-lg font-medium">{job.title}</h3>
                <p className="text-gray-600">{job.location}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No jobs posted yet.</p>
        )}
      </div>

      {/* Reviews */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Reviews</h2>

        {/* Button to write review for eligible employees */}
        {!isOwner && currentUser && (
          <Link
            href={`/companies/${companyId}/reviews/create`}
            className="inline-block mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Write a Review
          </Link>
        )}

        {reviews?.length ? (
          <ul className="space-y-3">
            {reviews.map((rev) => (
              <li key={rev.id} className="p-4 border rounded-lg">
                <p className="font-medium">Rating: {rev.rating}/5</p>
                <p>{rev.review_text}</p>
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
