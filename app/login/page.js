"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "../../api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const saveToken = (token) => {
    localStorage.setItem("access_token", token);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      const response = await axiosInstance.post("/login/", { email, password });

      saveToken(response.data.access);

      router.replace("/");
    } catch (error) {
      setError(error.message ?? "Failed to connect to the server");
    }
  };

  return (
    <div className="max-w-md mx-auto p-5">
      <img
        src="/Logo.jpg"
        alt="Logo"
        className="w-40 h-30 object-cover mx-auto"
      />

      {error && <p className="text-red-500">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-5 border border-white rounded-lg bg-white shadow-md"
      >
        <div className="mb-4">
          <label className="block mb-2">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nouran@cyprata.com"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="*******"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex justify-center mt-2">
          <button
            type="submit"
            className="w-11/12 py-2 bg-black text-white rounded cursor-pointer"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
