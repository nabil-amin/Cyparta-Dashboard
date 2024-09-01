"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

export default function Sidebar() {
  const [isEmployeesOpen, setIsEmployeesOpen] = useState(true);
  const [activeItem, setActiveItem] = useState(null);
  const profileRef = useRef(null);

  const toggleEmployees = () => {
    setIsEmployeesOpen(!isEmployeesOpen);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  useEffect(() => {
    if (profileRef.current) {
      profileRef.current.focus();
    }
  }, []);

  return (
    <div className="w-64 min-h-screen bg-white text-gray-800 border-r border-gray-300 rounded-2xl shadow-md p-4">
      <img
        src="/Logo.jpg"
        alt="Description of the image"
        className="w-48 h-auto mb-6 mx-auto"
      />
      <ul className="space-y-2">
        <li className="w-full">
          <button
            className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition ${
              activeItem === "dashboard" ? "bg-red-500 text-white" : ""
            } cursor-pointer w-full text-left`}
            onClick={() => handleItemClick("dashboard")}
          >
            <img
              src="dashboard.svg"
              className="w-5 h-5 mr-3"
              alt="Dashboard Icon"
            />
            Dashboard
          </button>
        </li>
        <li className="w-full">
          <button
            onClick={toggleEmployees}
            className={`flex items-center justify-between w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition ${
              activeItem === "employees" ? "bg-red-500 text-white" : ""
            } cursor-pointer`}
          >
            <span className="flex items-center">
              <img
                src="employees.svg"
                className="w-5 h-5 mr-3"
                alt="Employees Icon"
              />
              Employees
            </span>
            {isEmployeesOpen ? (
              <ChevronUpIcon className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 text-gray-600" />
            )}
          </button>
          {isEmployeesOpen && (
            <ul className="pl-4 mt-2 space-y-2 bg-gray-100 rounded-md">
              <li>
                <button
                  className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition ${
                    activeItem === "profile" ? "bg-red-500 text-white" : ""
                  } cursor-pointer w-full text-left`}
                  onClick={() => handleItemClick("profile")}
                  ref={profileRef}
                  tabIndex={-1}
                >
                  <img
                    src="user.svg"
                    className="w-5 h-5 mr-3"
                    alt="Profile Icon"
                  />
                  Profile
                </button>
              </li>
              <li>
                <button
                  className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition ${
                    activeItem === "attendance" ? "bg-red-500 text-white" : ""
                  } cursor-pointer w-full text-left`}
                  onClick={() => handleItemClick("attendance")}
                >
                  <img
                    src="attendance.svg"
                    className="w-5 h-5 mr-3"
                    alt="Attendance Icon"
                  />
                  Attendance
                </button>
              </li>
              <li>
                <button
                  className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition ${
                    activeItem === "tasks" ? "bg-red-500 text-white" : ""
                  } cursor-pointer w-full text-left`}
                  onClick={() => handleItemClick("tasks")}
                >
                  <img
                    src="task.svg"
                    className="w-5 h-5 mr-3"
                    alt="Tasks Icon"
                  />
                  Tasks
                </button>
              </li>
            </ul>
          )}
        </li>
        <li className="w-full">
          <button
            className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition ${
              activeItem === "payroll" ? "bg-red-500 text-white" : ""
            } cursor-pointer w-full text-left`}
            onClick={() => handleItemClick("payroll")}
          >
            <img src="coin.svg" className="w-5 h-5 mr-3" alt="Payroll Icon" />
            Payroll
          </button>
        </li>
        <li className="w-full">
          <button
            className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition ${
              activeItem === "advanced-payment" ? "bg-red-500 text-white" : ""
            } cursor-pointer w-full text-left`}
            onClick={() => handleItemClick("advanced-payment")}
          >
            <img
              src="wallet.svg"
              className="w-5 h-5 mr-3"
              alt="Advanced Payment Icon"
            />
            Advanced Payment
          </button>
        </li>
      </ul>
    </div>
  );
}
