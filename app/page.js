"use client";
import Image from "next/image";
import ProtectedwithAuth from "@/components/ProtectedRoute";
import AxiosInstance from "@/api/AxiosInstance";
import { useEffect, useState } from "react";

function Home() {
  const[data, setData] = useState()
  const GetData = () => {
    AxiosInstance.get('api/users/users/').then((res)=>{
      setData(res.data)
    })
  }
  useEffect(()=>{
    GetData()
  },[])
  return (
    <div >
      hello{JSON.stringify(data)}
    </div>
  );
}

export default ProtectedwithAuth(Home)
