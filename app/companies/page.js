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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Companies</h1>

        {user?.role === "employer" && (
          <button
            onClick={handleCreateCompany}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            + Add Company
          </button>
        )}
      </div>

      {/* Company grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map((company) => (
          <Link
            key={company.id}
            href={`/companies/${company.id}`}
            className="p-4 border rounded-lg hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{company.name}</h2>
            <p className="text-gray-600">{company.location}</p>
            <p className="mt-2 text-gray-700 line-clamp-3">
              {company.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProtectedwithAuth(CompaniesPage);
