"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // using pages router
import ProtectedwithAuth from "@/components/ProtectedRoute";
import AxiosInstance from "@/api/AxiosInstance";

function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    AxiosInstance.get("api/companies/")
      .then((res) => setCompanies(res.data))
      .catch((err) => console.error(err));

    AxiosInstance.get("api/users/me/")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const handleCreateCompany = () => {
    router.push("/companies/create");
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-semibold text-gray-900">Companies</h1>

        {user?.role === "employer" && (
          <button
            onClick={handleCreateCompany}
            className="px-6 py-3 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition duration-300"
          >
            + Add Company
          </button>
        )}
      </div>

      {/* Company grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <Link
            key={company.id}
            href={`/companies/${company.id}`}
            className="flex flex-col p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
          >
            <h2 className="text-2xl font-semibold text-gray-800">{company.name}</h2>
            <p className="text-gray-500">{company.location}</p>
            <p className="mt-3 text-gray-600 line-clamp-3">{company.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProtectedwithAuth(CompaniesPage);
