import CareerAdvice from "../pages/CareerAdvice";
import CarrerDevelopmentCourses from "./CarrerDevelopmentCourses";
import axios from "axios";
import React, { useState, useEffect } from "react";
export default function WorkLife() {
  const [contentData, setContentData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch content API data
  useEffect(() => {
    const fetchContentData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/career/content?category=Work Life"
        );
        setContentData(response.data); // Directly set the response data
      } catch (err) {
        console.error("Error fetching content data:", err);
        setError(err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContentData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error}</div>;

  // Extract title and contents from contentData
  const { title, contents } = contentData;
  return (
    <div>
      <CareerAdvice
        title={title} // Use dynamic title from API
        description={contents} // Use dynamic contents from API
      />
      <CarrerDevelopmentCourses />
    </div>
  );
}
