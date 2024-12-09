import React, { useState, useEffect } from "react";
import axios from "axios";
import TabsComponentCompany from "./TabsComponentCompany";
import FuturedCompanys from "../components/FuturedCompanys";
import CompanyCourse from "../components/CompanyCourses";
import Industries from "../components/Industries";

export default function Company() {
  // ............. Serching Campany  Start................
  // ............. Serching Campany  END..................
  const [activeTab, setActiveTab] = useState("employee");
  const [searchQuery, setSearchQuery] = useState("");
  const [liveJobs, setLiveJobs] = useState(0);
  const [employers, setEmployers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [liveJobs, employers] = await Promise.all([
          axios.get("http://127.0.0.1:3000/api/v1/job/liveJobsLength"),
          axios.get("http://127.0.0.1:3000/api/v1/job/companyLength"),
        ]);

        setLiveJobs(liveJobs.data);
        setEmployers(employers.data);
        // console.log(liveJobs.data);
        // console.log(employers.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSearchQuery("");
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const companyList = [
    { id: 1, name: "ABC Company" },
    { id: 2, name: "XYZ Inc." },
    { id: 3, name: "Acme Corporation" },
    { id: 4, name: "Omega Solutions" },
    { id: 5, name: "Delta Industries" },
    { id: 6, name: "Gamma Enterprises" },
    { id: 7, name: "Sigma Technologies" },
    { id: 8, name: "Theta Group" },
    { id: 9, name: "Iota Innovations" },
    { id: 10, name: "Fappa Designs" },
    { id: 11, name: "Lappa Designs" },
    { id: 12, name: "Zappa Designs" },
    { id: 13, name: "Tappa Designs" },
    { id: 14, name: "Mappa Designs" },
    { id: 15, name: "Nappa Designs" },
    { id: 16, name: "Cappa Designs" },
    { id: 17, name: "Qappa Designs" },
    { id: 18, name: "Zappa Designs" },
    { id: 19, name: "Xappa Designs" },
    { id: 20, name: "Pappa Designs" },
  ];

  const filteredCompanies = companyList.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const uniqueLetters = Array.from(
    new Set(
      filteredCompanies.map((company) => company.name.charAt(0).toUpperCase())
    )
  );

  return (
    <>
      <div className="bg-gradient-to-r from-[#002244] to-[#4682B4] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-full mx-auto">
          <div className="text-center text-white font-medium">
            Search {liveJobs} jobs from {employers} companies
          </div>
        </div>
      </div>
      <div className="bg-white shadow-sm rounded-lg p-4 md:p-16 mx-4 md:mx-auto max-w-6xl my-8">
        <h2 className="text-2xl font-bold mb-4">Search jobs by company</h2>
        <p className="text-gray-600 mb-6">
          Search 10,116 recruitment agencies and companies in CV-Library's
          business directory
        </p>
        <ul className="flex border-b border-gray-300">
          <li
            className={`cursor-pointer px-4 py-2 rounded-t-lg ${
              activeTab === "employee"
                ? "bg-gradient-to-r from-[#002244] to-[#4682B4] text-white"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
            onClick={() => handleTabClick("employee")}
          >
            <h3 className="text-lg font-medium">Search Employee</h3>
          </li>
          <li
            className={`cursor-pointer px-4 py-2 rounded-t-lg ${
              activeTab === "agency"
                ? "bg-gradient-to-r from-[#002244] to-[#4682B4] text-white"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
            onClick={() => handleTabClick("agency")}
          >
            <h3 className="text-lg font-medium">Search Recruitment Agencies</h3>
          </li>
        </ul>
        <div className="mt-6">
          {activeTab === "employee" && (
            <div className="contents">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Employer Name"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#4682B4] focus:border-[#4682B4] pr-12"
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <button className="absolute right-0 top-0 bottom-0 px-4 rounded-r-md bg-gradient-to-r from-[#002244] to-[#4682B4] text-white hover:bg-gray-700 focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-6">
                <ul className="flex flex-wrap text-lg font-medium">
                  <li className="mr-4 mb-2">
                    <a href="#" className="text-gray-600 hover:text-gray-800">
                      0-9
                    </a>
                  </li>
                  {uniqueLetters.map((letter) => (
                    <li key={letter} className="mr-4 mb-2">
                      <a href="#" className="text-gray-600 hover:text-gray-800">
                        {letter}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {activeTab === "agency" && (
            <div className="contents">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Recruitment Agency Name"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#4682B4] focus:border-[#4682B4] pr-12"
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <button className="absolute right-0 top-0 bottom-0 px-4 rounded-r-md bg-gradient-to-r from-[#002244] to-[#4682B4] text-white hover:bg-gray-700 focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-6">
                <ul className="flex flex-wrap text-lg font-medium">
                  <li className="mr-4 mb-2">
                    <a href="#" className="text-gray-600 hover:text-gray-800">
                      0-9
                    </a>
                  </li>
                  {uniqueLetters.map((letter) => (
                    <li key={letter} className="mr-4 mb-2">
                      <a href="#" className="text-gray-600 hover:text-gray-800">
                        {letter}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* part */}
          <TabsComponentCompany />
        </div>
      </div>
      <FuturedCompanys />
      <CompanyCourse />
      <Industries />
    </>
  );
}
