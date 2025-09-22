"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ProtectedwithAuth from "@/components/ProtectedRoute";
import AxiosInstance from "@/api/AxiosInstance";

function CreateCompanyJobPage() {
  const router = useRouter();
  const params = useParams(); // gives us { id: 'companyId' }
  const companyId = params?.id;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await AxiosInstance.post("api/jobs/", {
        ...formData,
        company: companyId, // company pre-filled
      });
      router.push(`/companies/${companyId}`);
    } catch (err) {
      console.error(err);
      setError("Failed to post job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Post a Job</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 border p-6 rounded-lg shadow-md bg-white"
      >
        <div>
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
}

export default ProtectedwithAuth(CreateCompanyJobPage);
