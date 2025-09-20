"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedwithAuth(Component) {
  return function ProtectedComponent(props) {
    const router = useRouter();
    const isAuthenticated = Boolean(localStorage.getItem("Token"));
    console.log(isAuthenticated, 'ger')

    useEffect(() => {
      if (!isAuthenticated) {
        router.replace("/login"); // redirect if not logged in
      }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
      return null; // render nothing while redirecting
    }

    return <Component {...props} />;
  };
}
