"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AxiosInstance from "@/api/AxiosInstance";
import ProtectedwithAuth from "@/components/ProtectedRoute";
import { FaStar } from "react-icons/fa";

function JobsPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    AxiosInstance.get("api/jobs/")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
  }, []);

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Browse Jobs</h1>

        {jobs.length === 0 ? (
          <p className="text-gray-600">No jobs available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="block bg-white rounded-lg shadow-sm border hover:shadow-md transition p-5"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-1">{job.title}</h2>
                <p className="text-gray-600 mb-2">{job.location}</p>

                {job.company_name && (
                  <p className="text-gray-700 font-medium mb-1">{job.company_name}</p>
                )}

                {/* Star rating */}
                {job.company_rating ? (
                  renderStars(job.company_rating)
                ) : (
                  <p className="text-sm text-gray-400">No ratings yet</p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProtectedwithAuth(JobsPage);
