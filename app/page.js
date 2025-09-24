// /pages/index.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AxiosInstance from "@/api/AxiosInstance";
import ProtectedwithAuth from "@/components/ProtectedRoute";

function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [jobsRes, reviewsRes] = await Promise.all([
          AxiosInstance.get("api/jobs/"),
          AxiosInstance.get("api/reviews/"),
        ]);
        setJobs(jobsRes.data.slice(0, 5)); // show latest 5 jobs
        setReviews(reviewsRes.data.slice(0, 5)); // show latest 5 reviews
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Welcome to Glassdoor Clone</h1>

      {/* Jobs Section */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Latest Jobs</h2>
          <Link href="/jobs" className="text-green-600 hover:underline">
            View all jobs →
          </Link>
        </div>
        {jobs.length ? (
          <ul className="space-y-4">
            {jobs.map((job) => (
              <li key={job.id} className="p-4 border rounded-lg hover:shadow-md transition">
                <Link href={`/jobs/${job.id}`} className="block">
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="text-gray-600">{job.location}</p>
                  <p className="text-sm text-gray-500">
                    Company: <span className="font-medium">{job.company_name}</span> | ⭐{" "}
                    {job.company_rating}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No jobs found.</p>
        )}
      </section>

      {/* Reviews Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Latest Reviews</h2>
          <Link href="/reviews" className="text-green-600 hover:underline">
            View all reviews →
          </Link>
        </div>
        {reviews.length ? (
          <ul className="space-y-4">
            {reviews.map((review) => (
              <li key={review.id} className="p-4 border rounded-lg hover:shadow-md transition">
                <h3 className="text-lg font-medium">
                  {review.company_name} — ⭐ {review.rating}
                </h3>
                <p className="text-gray-700 mt-2">{review.review_text}</p>
                <p className="text-sm text-gray-500 mt-1">
                  by <span className="font-medium">{review.user_name}</span>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </section>
    </div>
  );
}

export default ProtectedwithAuth(HomePage);
