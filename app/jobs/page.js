"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AxiosInstance from "@/api/AxiosInstance";
import ProtectedwithAuth from "@/components/ProtectedRoute";

function JobsPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    AxiosInstance.get("api/jobs/")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Jobs</h1>
      <div className="space-y-3">
        {jobs.map((job) => (
          <Link
            key={job.id}
            href={`/jobs/${job.id}`}
            className="block p-4 border rounded hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.location}</p>
            <p className="text-sm text-gray-500">Company ID: {job.company}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProtectedwithAuth(JobsPage);
