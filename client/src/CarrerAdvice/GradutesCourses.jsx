import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CarrerDevelopmentCourses() {
  //  for image , tilte and created at start ...........
  const [data, setData] = useState([]);
  const [dataa, setDataa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/career/category?category=Graduates"
        );
        setData(response.data.populatedEntries); // Access populatedEntries
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataa = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/career/imageandtitle?category=Graduates"
        );
        setDataa(response.data.populatedEntries);
        console.log(response.data.populatedEntries); // Access populatedEntries
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDataa();
  }, []);
  // Get the first entry from the populatedEntries
  const firstEntry = dataa[0];
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error}</div>;

  //  for image , tilte and created at end ...........
  return (
    <>
      {/* firt */}
      <div className="p-12">
        {firstEntry && (
          <div className="first-adivce-card relative overflow-hidden rounded-lg shadow-lg">
            <img
              className="w-full h-64 object-cover"
              src={firstEntry.authorId.image}
              alt="image not found ..."
            />
            <div className="text-white absolute bottom-0 left-0 p-8 bg-[#002244] bg-opacity-70 w-full">
              <span className="text-md font-medium">By Content Team</span>
              <a
                href="#"
                className="block text-2xl mt-3 font-bold hover:underline"
              >
                {firstEntry.title}
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="container  flex w-[100vw] flex-col lg:flex-row justify-between  p-16 pr-8">
        <div className="mb-8   flex flex-col gap-20 lg:basis-[69%]">
          {/* start first grid */}
          <div className="">
            <div className="flex  justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold">Popular Career Advice</h3>
              <a href="#" className="text-blue-500 hover:underline">
                All courses
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.slice(0, 3).map((entry, index) => (
                <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={entry.authorId.image} // Use the author's image
                      alt="Career Advice Image not found ..."
                      className="w-full h-full object-cover clip-path-mypolygon"
                    />
                  </div>
                  <div className="p-4">
                    <a
                      href="#"
                      className="text-lg font-medium text-gray-800 hover:text-[#002277]"
                    >
                      {entry.title} {/* Display the title */}
                    </a>
                    <div className="flex items-center mt-4">
                      <div className="bg-[#002244] text-xl text-white h-12 w-12 rounded-full flex justify-center items-center">
                        C
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-600 text-lg">Content team</p>
                        <p className="text-gray-500 text-sm">
                          {new Date(entry.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 mt-12 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* First Card */}
              {/* Second Card */}
              {/* Third Card */}{" "}
              {data.slice(3, 6).map((entry, index) => (
                <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={entry.authorId.image} // Use the author's image
                      alt="Career Advice Image not found ..."
                      className="w-full h-full object-cover clip-path-mypolygon"
                    />
                  </div>
                  <div className="p-4">
                    <a
                      href="#"
                      className="text-lg font-medium text-gray-800 hover:text-[#002277]"
                    >
                      {entry.title} {/* Display the title */}
                    </a>
                    <div className="flex items-center mt-4">
                      <div className="bg-[#002244] text-xl text-white h-12 w-12 rounded-full flex justify-center items-center">
                        C
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-600 text-lg">Content team</p>
                        <p className="text-gray-500 text-sm">
                          {new Date(entry.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* third cycle*/}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.slice(6, 9).map((entry, index) => (
              <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={entry.authorId.image} // Use the author's image
                    alt="Career Advice Image not found ..."
                    className="w-full h-full object-cover clip-path-mypolygon"
                  />
                </div>
                <div className="p-4">
                  <a
                    href="#"
                    className="text-lg font-medium text-gray-800 hover:text-[#002277]"
                  >
                    {entry.title} {/* Display the title */}
                  </a>
                  <div className="flex items-center mt-4">
                    <div className="bg-[#002244] text-xl text-white h-12 w-12 rounded-full flex justify-center items-center">
                      C
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-600 text-lg">Content team</p>
                      <p className="text-gray-500 text-sm">
                        {new Date(entry.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className=" flex flex-col gap-10  rounded-lg lg:basis-[25%]">
          <div className=" p-6 ">
            <h2 className="text-2xl font-semibold mb-4">Browse Top Sectors</h2>
            <div className="flex flex-col gap-4">
              <a href="#" className="text-[#002244] hover:underline">
                NHS Jobs
              </a>
              <a href="#" className="text-[#002244] hover:underline">
                Retail Jobs
              </a>
              <a href="#" className="text-[#002244] hover:underline">
                Customer Services Jobs
              </a>
              <a href="#" className="text-[#002244] hover:underline">
                Engineering Jobs
              </a>
              <a href="#" className="text-[#002244] hover:underline">
                Marketing Jobs
              </a>
              <a href="#" className="text-[#002244] hover:underline">
                Accountancy & Accounting Jobs
              </a>
              <a href="#" className="text-[#002244] hover:underline">
                Construction Jobs
              </a>
              <a href="#" className="text-[#002244] hover:underline">
                IT Jobs
              </a>
              <a href="#" className="text-[#002244] hover:underline">
                Admin & Administration Jobs
              </a>
              <a href="#" className="text-[#002244] hover:underline">
                Sales Jobs
              </a>
              <a href="#" className="text-[#002244] hover:underline">
                Education Jobs
              </a>
            </div>
          </div>

          {/* First Card */}
          <div className="card bg-white shadow-sm rounded-lg overflow-hidden p-6">
            <div className="flex flex-col items-center">
              <img
                src="https://media.istockphoto.com/id/1354898581/photo/shot-of-a-young-businessman-using-a-laptop-in-a-modern-office.jpg?s=612x612&w=0&k=20&c=dDDNcvIoG-4VdO01ZlENqODBoNocT434vIFp0duuTZM="
                alt="Salary Guide"
                className="w-24 h-24 mb-4 object-cover rounded-full border-2 border-gray-300"
              />
              <h2 className="text-xl font-semibold mb-2">Salary Guide</h2>
              <p className="text-gray-600 text-center">
                Check out average salaries across the UK and find out how much
                you could earn!
              </p>
              <button
                className="bg-none border-b-2 border-dark-blue
     text-[#002244] font-semibold py-2 px-4  mt-4"
              >
                View Salary Guide
              </button>
            </div>
          </div>
          {/* Second Card */}
          <div className="card bg-white shadow-sm rounded-lg overflow-hidden p-6">
            <div className="flex flex-col items-center">
              <img
                src="https://media.istockphoto.com/id/1338846097/photo/handsome-man-using-smartphone-walking-through-night-city-full-of-neon-colors-and.jpg?s=612x612&w=0&k=20&c=eXbBEHWiazMuqdv4zy0POeHm1w1v6KGPw79OXOKUT9k="
                alt="Salary Guide"
                className="w-24 h-24 mb-4 object-cover rounded-full border-2 border-gray-300"
              />
              <h2 className="text-xl font-semibold mb-2">
                Salary Tax Calculator
              </h2>
              <p className="text-gray-600 text-center">
                Know how much you are actually earning each month? Check out our
                Salary Tax Calculator.
              </p>
              <button
                className="bg-none border-b-2 border-dark-blue
     text-[#002244] font-semibold py-2 px-4  mt-4"
              >
                Calculate earning
              </button>
            </div>
          </div>
          <div className="card bg-white shadow-sm rounded-lg overflow-hidden p-6">
            <div className="flex flex-col items-center">
              <img
                src="https://media.istockphoto.com/id/1153350345/photo/time-to-get-growing.jpg?s=612x612&w=0&k=20&c=NtxRQ_cn-Eo-nTnGWNZXWq77eogf4LZPwXaHpd58qY4="
                alt="Salary Guide"
                className="w-24 h-24 mb-4 object-cover rounded-full border-2 border-gray-300"
              />
              <h2 className="text-xl font-semibold mb-2">Writers Network</h2>
              <p className="text-gray-600 text-center">
                We're on the hunt for guest writers to contribute one-off
                informative and entertaining articles to our Career Advice blog.
              </p>
              <button
                className="bg-none border-b-2 border-dark-blue
     text-[#002244] font-semibold py-2 px-4  mt-4"
              >
                Become a Guest writter
              </button>
            </div>
          </div>
        </div>
        {/* end */}
      </div>
    </>
  );
}
