"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ProtectedwithAuth from "@/components/ProtectedRoute";
import AxiosInstance from "@/api/AxiosInstance";

function CreateCompanyJobPage() {
  const router = useRouter();
  const params = useParams();
  const companyId = params?.id;

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear field error on input change
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const errors = {};

    if (!formData.title.trim()) errors.title = "Title is required.";
    if (!formData.location.trim()) errors.location = "Location is required.";
    if (!formData.description.trim()) errors.description = "Description is required.";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError("");

    if (!validate()) return;

    setLoading(true);

    try {
      await AxiosInstance.post("api/jobs/", {
        ...formData,
        company: companyId,
      });

      router.push(`/companies/${companyId}`);
    } catch (err) {
      console.error(err);
      setGlobalError("Failed to post job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Post a Job</h1>

      {globalError && <p className="text-red-600 mb-4">{globalError}</p>}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-8 bg-white rounded-lg shadow-lg"
      >
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
              fieldErrors.title ? "border-red-500" : "focus:ring-green-500"
            }`}
          />
          {fieldErrors.title && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.title}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
              fieldErrors.location ? "border-red-500" : "focus:ring-green-500"
            }`}
          />
          {fieldErrors.location && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.location}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            name="description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            className={`w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
              fieldErrors.description ? "border-red-500" : "focus:ring-green-500"
            }`}
          />
          {fieldErrors.description && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.description}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 disabled:opacity-50 transition"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
}

export default ProtectedwithAuth(CreateCompanyJobPage);
