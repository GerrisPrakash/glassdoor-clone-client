"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AxiosInstance from "@/api/AxiosInstance";
import ProtectedwithAuth from "@/components/ProtectedRoute";

function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    AxiosInstance.get(`api/jobs/${id}/`)
      .then((res) => setJob(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-6">Loading job details...</p>;
  if (!job) return <p className="p-6 text-red-600">Job not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{job.title}</h1>
        <p className="text-gray-600 text-lg mb-1">{job.location}</p>
        <p className="text-sm text-gray-500 mb-4">
          Posted by <span className="font-medium">{job.posted_by_name || "Unknown"}</span> at{" "}
          <span className="font-medium">{job.company_name || "Company"}</span>
        </p>

        <hr className="my-4" />

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Job Description</h2>
          <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          Posted on: {new Date(job.created_at).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

export default ProtectedwithAuth(JobDetailPage);
