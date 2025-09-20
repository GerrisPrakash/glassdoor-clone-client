"use client";
import Image from "next/image";
import ProtectedwithAuth from "@/components/ProtectedRoute";
import AxiosInstance from "@/api/AxiosInstance";
import { useEffect, useState } from "react";

function Jobs() {
  const[data, setData] = useState()
  const GetData = () => {
    AxiosInstance.get('users/').then((res)=>{
      setData(res.data)
    })
  }
  useEffect(()=>{
    GetData()
  },[])
  return (
    <div className="bg-red-200">
      jobs
    </div>
  );
}

export default ProtectedwithAuth(Jobs)
