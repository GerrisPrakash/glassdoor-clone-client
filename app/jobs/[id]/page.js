"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AxiosInstance from "@/api/AxiosInstance";
import ProtectedwithAuth from "@/components/ProtectedRoute";

function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    if (!id) return;
    AxiosInstance.get(`api/jobs/${id}/`)
      .then((res) => setJob(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!job) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
      <p className="text-gray-600 mb-2">{job.location}</p>
      <p className="mb-4">{job.description}</p>
      <p className="text-sm text-gray-500">Company ID: {job.company}</p>
      <p className="text-sm text-gray-500">Posted by: {job.posted_by}</p>
    </div>
  );
}

export default ProtectedwithAuth(JobDetailPage);
