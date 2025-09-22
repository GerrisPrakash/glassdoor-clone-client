"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedwithAuth from "@/components/ProtectedRoute";
import AxiosInstance from "@/api/AxiosInstance";

function CreateCompanyPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
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
      await AxiosInstance.post("api/companies/", formData);
      router.push("/companies");
    } catch (err) {
      console.error(err);
      setError("Failed to create company. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create Company</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 border p-6 rounded-lg shadow-md bg-white"
      >
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Company Name
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
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
          {loading ? "Creating..." : "Create Company"}
        </button>
      </form>
    </div>
  );
}

export default ProtectedwithAuth(CreateCompanyPage);
