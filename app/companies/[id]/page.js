// /pages/companies/[id].js
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AxiosInstance from "@/api/AxiosInstance";
import ProtectedwithAuth from "@/components/ProtectedRoute";

function CompanyDetailPage() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    AxiosInstance.get(`api/companies/${id}/`)
      .then((res) => setCompany(res.data))
      .catch((err) => console.error(err));

    AxiosInstance.get(`api/jobs/`)
      .then((res) =>
        setJobs(res.data.filter((job) => job.company === parseInt(id)))
      )
      .catch((err) => console.error(err));

    AxiosInstance.get(`api/reviews/`)
      .then((res) =>
        setReviews(res.data.filter((review) => review.company === parseInt(id)))
      )
      .catch((err) => console.error(err));
  }, [id]);

  if (!company) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{company.name}</h1>
      <p className="text-gray-600 mb-4">{company.location}</p>
      <p className="mb-6">{company.description}</p>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Jobs</h2>
        {jobs.length === 0 ? (
          <p>No jobs posted yet.</p>
        ) : (
          <ul className="space-y-2">
            {jobs.map((job) => (
              <li key={job.id} className="p-2 border rounded hover:bg-gray-50">
                {job.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul className="space-y-2">
            {reviews.map((review) => (
              <li key={review.id} className="p-2 border rounded">
                <p className="font-semibold">Rating: {review.rating}/5</p>
                <p>{review.review_text}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ProtectedwithAuth(CompanyDetailPage);
