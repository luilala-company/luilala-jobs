import React, { useState, useEffect } from "react";
import axios from "axios";
import CarouselCards from "../components/CarouselCards";
import CardContainer from "../components/IndustoryCards";
import IndustoryCard from "../components/IndustoryCards";
import JobCategories from "../components/JobCategories";
import Searchbar from "../components/Searchbar";

export default function SearchJob() {
  const [liveJobs, setLiveJobs] = useState(0);
  const [employers, setEmployers] = useState(0);
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    const fetchData1 = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:3000/api/v1/populerIndustries/jobs"
        );
        const data = await response.json();
        setCardData(data);
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };
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
    fetchData1();
  });

  return (
    <div>
      <p className="text-gray-200 py-1 text-sm bg-[#002244] text-center font-medium">
        Search {liveJobs} jobs from {employers} companies
      </p>
      <Searchbar />
      <CarouselCards />
      <CardContainer cardData={cardData} />
      <JobCategories />
    </div>
  );
}
