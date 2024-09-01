"use client";

import { useState, useEffect } from "react";
import { BellIcon } from "@heroicons/react/20/solid";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import axiosInstance from "@/api";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const loadToken = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    }
  };

  const fetchProfileData = async () => {
    try {
      const response = await axiosInstance.get("/profile/");
      setProfileData(response.data);
      setFormData(response.data);
    } catch (error) {
      if (error.status === 401) {
        router.replace("/login");
      }
      setError(error.response?.data?.detail || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadToken();
    fetchProfileData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { cover, image, ...restData } = formData;
      const response = await axiosInstance.patch("/profile/", restData);
      setProfileData(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile data:", error);
      setError(error.response?.data?.message || "Error updating profile data.");
    }
  };

  if (loading) {
    return <p>Loading profile data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!profileData) {
    return <p>No profile data available.</p>;
  }

  return (
    <>
      <div className="relative flex items-center justify-end p-4">
        <div className="flex items-center space-x-4">
          <BellIcon className="h-8 w-8 text-gray-400" />
          <img
            alt="Profile"
            src={profileData.image || "../0789eb2ae78a0c54fff9744349494417.jpg"}
            className="h-10 w-10 rounded-full ring-2 ring-white"
          />
        </div>
      </div>

      <div className="p-4">
        <p className="flex items-center space-x-2 text-gray-700">
          <span>Employees</span>
          <ChevronRightIcon className="w-5 h-5 text-gray-600" />
          <span>Profile</span>
        </p>
      </div>

      <div className="flex p-4 m-4 bg-white rounded-lg shadow-md">
        <img
          src={profileData.image || "../0789eb2ae78a0c54fff9744349494417.jpg"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover mr-4"
        />
        <div className="flex flex-col justify-between flex-1">
          {isEditing ? (
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="first_name"
                value={formData.first_name || ""}
                onChange={handleInputChange}
                className="w-full mb-2 p-2 border rounded"
                placeholder="First Name"
              />
              <input
                type="text"
                name="last_name"
                value={formData.last_name || ""}
                onChange={handleInputChange}
                className="w-full mb-2 p-2 border rounded"
                placeholder="Last Name"
              />
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleInputChange}
                className="w-full mb-2 p-2 border rounded"
                placeholder="Email"
              />
              <button
                type="submit"
                className="px-8 py-1.5 text-lg text-white bg-black rounded hover:bg-gray-800"
              >
                Save
              </button>
            </form>
          ) : (
            <>
              <div>
                <h2 className="text-lg font-semibold mb-2">
                  {profileData.first_name + " " + profileData.last_name || ""}
                </h2>
                <p className="text-sm text-gray-600 mb-2">UI/UX DEVELOPER</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 mb-2">
                  {profileData.email || ""}
                </p>
                <button
                  onClick={handleEditClick}
                  className="px-8 py-1.5 text-lg text-white bg-black rounded hover:bg-gray-800"
                >
                  Edit
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-gray-50 p-4">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr className="flex flex-row space-x-20">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b flex items-center">
                <div className="flex flex-col items-center">
                  <img src="pi.svg" alt="Person Icon" className="mb-2" />
                  <span>Person Information</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b flex items-center">
                <div className="flex flex-col items-center">
                  <img
                    src="briefcase.svg"
                    alt="Briefcase Icon"
                    className="mb-2"
                  />
                  <span>Professional Information</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b flex items-center">
                <div className="flex flex-col items-center">
                  <img
                    src="document.svg"
                    alt="Document Icon"
                    className="mb-2"
                  />
                  <span>Document</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b flex items-center">
                <div className="flex flex-col items-center">
                  <img src="lock.svg" alt="Lock Icon" className="mb-2" />
                  <span>Account Access</span>
                </div>
              </th>
            </tr>
          </thead>
        </table>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <tbody>
            <tr className="border-b border-gray-300">
              <td className="px-4 py-2 relative">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs bg-white px-1 mb-1">
                    First Name
                  </span>
                  <span>{profileData.first_name || ""}</span>
                </div>
              </td>
              <td className="px-4 py-2 relative">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs bg-white px-1 mb-1">
                    Last Name
                  </span>
                  <span>{profileData.last_name || ""}</span>
                </div>
              </td>
              <td className="px-4 py-2 relative"></td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="px-4 py-2 relative">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs bg-white px-1 mb-1">
                    Phone
                  </span>
                  <span>{profileData.phone || ""}</span>
                </div>
              </td>
              <td className="px-4 py-2 relative">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs bg-white px-1 mb-1">
                    Email
                  </span>
                  <span>{profileData.email || ""}</span>
                </div>
              </td>
              <td className="px-4 py-2 relative"></td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="px-4 py-2 relative">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs bg-white px-1 mb-1">
                    Date of Birth
                  </span>
                  <span>July 14, 1905</span>
                </div>
              </td>
              <td className="px-4 py-2 relative">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs bg-white px-1 mb-1">
                    Marital Status
                  </span>
                  <span>Single</span>
                </div>
              </td>
              <td className="px-4 py-2 relative"></td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="px-4 py-2 relative">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs bg-white px-1 mb-1">
                    Gender
                  </span>
                  <span>Female</span>
                </div>
              </td>
              <td className="px-4 py-2 relative">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs bg-white px-1 mb-1">
                    Nationality
                  </span>
                  <span>Egypt</span>
                </div>
              </td>
              <td className="px-4 py-2 relative"></td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="px-4 py-2 relative">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs bg-white px-1 mb-1">
                    Address
                  </span>
                  <span>Maadi</span>
                </div>
              </td>
              <td className="px-4 py-2 relative">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs bg-white px-1 mb-1">
                    City
                  </span>
                  <span>Cairo</span>
                </div>
              </td>
              <td className="px-4 py-2 relative"></td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="px-4 py-2 relative">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs bg-white px-1 mb-1">
                    State
                  </span>
                  <span>Cairo</span>
                </div>
              </td>
              <td className="px-4 py-2 relative">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs bg-white px-1 mb-1">
                    Postal Code
                  </span>
                  <span>35624</span>
                </div>
              </td>
              <td className="px-4 py-2 relative"></td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="px-4 py-2 relative">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs bg-white px-1 mb-1">
                    Work Hours
                  </span>
                  <span>180 Hours</span>
                </div>
              </td>
              <td className="px-4 py-2 relative">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs bg-white px-1 mb-1">
                    Salary/Hour
                  </span>
                  <span>300 EGP</span>
                </div>
              </td>
              <td className="px-4 py-2 relative">
                <div className="flex flex-col">
                  <span className="text-red-500 text-lg bg-white px-1 mb-1">
                    Total Salary
                  </span>
                  <span>54,000 EGP</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
