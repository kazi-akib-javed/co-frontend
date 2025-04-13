"use client";
import AxiosInstance, { setAccessToken } from "@/axios/config";
import { useAuth } from "@/context/authContext";
import { LoginUrlGeneral } from "@/urls/allUrls";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login }  = useAuth();
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setErrorMessage("Both fields are required.");
      return;
    }

    try {
      // Call the API with the email and password
      AxiosInstance.post(LoginUrlGeneral, {
        email: email,
        password: password,
      })
        .then((res) => {
          login(res?.data?.payload?.data);
          setAccessToken(res?.data?.payload?.data?.accessToken);
          console.log(res?.data);
          router.push('/dashboard')
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage(error?.message)});
    } catch (error) {
      // Catch any network or unexpected errors
      console.error("Login error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 max-w-sm w-full border rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-center mb-4">Sign In</h2>
        <p className=" text-center text-gray-700 mb-4">
          Use your email and password to login
        </p>
        {errorMessage && (
          <div className="bg-red-200 text-red-800 p-2 rounded mb-4 text-center">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              id="email"
              className="border p-2 rounded-lg"
              placeholder="Enter your email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              id="password"
              className="border p-2 rounded-lg"
              placeholder="Enter your password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-slate-500 p-2 rounded-lg text-white hover:bg-slate-400"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
