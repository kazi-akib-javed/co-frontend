"use client";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ErrorResponseAlert from "../alerts/error-response";
import AxiosInstance from "@/axios/config";
import { LogoutUrl } from "@/urls/allUrls";
const Dashboard = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [error, setError] = useState('');
  const { logout }  = useAuth();
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  const logOut = async () => {
    AxiosInstance.post(LogoutUrl).then(()=>{
      logout();
      router.replace("/");
    }).catch((error)=>{
      setError(error.message);
    });
  };
  return (
    <div>
      <button onClick={logOut}>Logout</button>
      {error&&<ErrorResponseAlert message={error}/>}
      <div className="flex justify-center items-center text-xl font-bold">
        Search Your University Here
      </div>
      <div className="bg-white shadow-xl rounded-lg px-6 py-4">
        <div className="relative">
          <div className="h-32 relative overflow-hidden">
            <Image
              className="absolute opacity-50 inset-0 w-full h-full object-cover"
              src="/card-bg.jpg"
              alt="alt"
              width={500}
              height={100}
            />
          </div>
          <div className="font-bold absolute top-0 left-0 w-full h-full flex flex-col justify-end p-4">
            <div className="text-xl">University of Paderborn</div>
            <div className="text-sm">North-Rhine Westphalia</div>
            <div className="text-sm">Master</div>
            <div className="text-sm">Computer Science</div>
          </div>
        </div>
        <br></br>
        <div className="flex justify-center text-xs">Must have bachelor in computer science and related fields</div>
        <br></br>
        <div className="grid grid-cols-2 gap-2">
          <div className="font-bold text-sm">
            Tuition Fee <div className="opacity-45">500€/semester</div>
          </div>
          <div className="font-bold text-sm">
            Required GPA in Bachelor
            <div className="opacity-45">2.5(German Scale)</div>
          </div>
          <div className="font-bold text-sm">
            English Test <div className="opacity-45">IELTS 6.5, TOEFL 98</div>
          </div>
          <div className="font-bold text-sm">
            German Test <div className="opacity-45">Not required</div>
          </div>
          <div className="font-bold text-sm">
            GRE <div className="opacity-45">Not required</div>
          </div>
          <div className="font-bold text-sm">
            Application Period{" "}
            <div className="opacity-45">21 Jun to 20 Aug</div>
          </div>
          <div className="font-bold text-sm">
            Admission Type <div className="opacity-45">Restricted</div>
          </div>
          <div className="font-bold text-sm">
            Admission Session{" "}
            <div className="opacity-45">Summer and Winter</div>
          </div>
          <div className="font-bold text-sm">
            Course Website
            <div className="underline opacity-45">www.google.com/auth/type</div>
          </div>
          <div className="font-bold text-sm">
            Apply Via: <div className="opacity-45">Uni-assist</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
