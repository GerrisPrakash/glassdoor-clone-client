"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedwithAuth(Component) {
  return function ProtectedComponent(props) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading

    useEffect(() => {
      // Only run in the browser
      const token = typeof window !== "undefined" ? localStorage.getItem("Token") : null;

      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.replace("/login"); // redirect if not logged in
      }
    }, [router]);

    if (isAuthenticated === null) {
      // While checking, show loader or nothing
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return null; // prevent rendering before redirect
    }

    return <Component {...props} />;
  };
}
