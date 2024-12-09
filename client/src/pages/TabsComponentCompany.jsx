import React, { useState, useEffect } from "react";
import axios from "axios";

const TabsComponentCompany = () => {
  const [activeTab, setActiveTab] = useState("popular");
  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch popular agencies
        const popularResponse = await axios.get(
          "http://localhost:3000/api/v1/agency/popularagencies"
        );

        // Fetch country agencies
        const countryResponse = await axios.get(
          "http://localhost:3000/api/v1/agency/countryagencies"
        );

        // Fetch industries
        const industriesResponse = await axios.get(
          "http://localhost:3000/api/v1/agency/agenciesWithThereJobs"
        );

        setCompanyData([
          {
            type: "popular",
            companies: popularResponse.data.data.map((agency) => agency.name), // Extract names of popular agencies
          },
          {
            type: "county",
            companies: countryResponse.data, // Array of countries
          },
          {
            type: "industries",
            companies: industriesResponse.data.data, // Directly use the array from the response
          },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-6xl my-8 mx-4 sm:mx-auto">
      <div className="mb-6">
        <ul className="flex border-b border-gray-300 overflow-x-auto">
          <li
            className={`cursor-pointer px-4 py-2 rounded-t-lg whitespace-nowrap ${
              activeTab === "popular"
                ? "bg-gradient-to-r from-[#002244] to-[#4682B4] text-white"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
            onClick={() => handleTabClick("popular")}
          >
            <h3 className="text-lg font-medium capitalize">popular agencies</h3>
          </li>
          <li
            className={`cursor-pointer px-4 py-2 rounded-t-lg whitespace-nowrap ${
              activeTab === "county"
                ? "bg-gradient-to-r from-[#002244] to-[#4682B4] text-white"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
            onClick={() => handleTabClick("county")}
          >
            <h3 className="text-lg font-medium capitalize">country agencies</h3>
          </li>
          <li
            className={`cursor-pointer px-4 py-2 rounded-t-lg whitespace-nowrap ${
              activeTab === "industries"
                ? "bg-gradient-to-r from-[#002244] to-[#4682B4] text-white"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
            onClick={() => handleTabClick("industries")}
          >
            <h3 className="text-lg font-medium capitalize">industries</h3>
          </li>
        </ul>
      </div>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {companyData
          .find((tab) => tab.type === activeTab)
          ?.companies.map((company, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-md px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              {company}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TabsComponentCompany;
