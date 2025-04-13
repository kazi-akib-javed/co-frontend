"use client";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ErrorResponseAlert from "../alerts/error-response";
import AxiosInstance from "@/axios/config";
import { LogoutUrl, ProgramPagination } from "@/urls/allUrls";
import Search from "../components/search/page";
import ProgramCard from "../components/cards/program/page";

const Dashboard = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [error, setError] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      console.log(user);
      if (!user) {
        return;
      }
      try {
        const response = await AxiosInstance.get(`${ProgramPagination}page=1&limit=10`);
        setData(response.data.payload.data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchPrograms();
  }, [user, router]);

  const logOut = async () => {
    try {
      await AxiosInstance.post(LogoutUrl);
      logout();
      router.replace("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-4 py-10">
      <button onClick={logOut} className="px-4 py-2 bg-red-500 text-white rounded">
        Logout
      </button>
      {error && <ErrorResponseAlert message={error} />}
      <div className="flex justify-center items-center text-xl font-bold">
        <Search placeholder="Search here ..." />
      </div>
      <div className="grid gap-6">
        {data.length > 0 ? (
          data.map((program, index) => (
            <ProgramCard key={index} program={program} />
          ))
        ) : (
          <div className="text-center">No programs found.</div>
        )}
      </div>
    </div>
  );
};


// Reusable component for program details
const ProgramDetail = ({ label, value }: { label: string; value: any }) => {
  return (
    <div className="font-bold text-sm">
      {label}
      <div className="opacity-45">{value}</div>
    </div>
  );
};

export default Dashboard;
