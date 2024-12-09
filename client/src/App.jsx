import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SearchResults from "./components/SearchResults";
import JobDetails1 from "./components/JobDetails";
import SearchJob from "./pages/SearchJob";
import SecondSearchResult from "./components/SecondSearchResult";
import JobDetails from "./pages/JobDetails";
import CvBuilder from "./pages/CvBuilder";
import JobAlerts from "./pages/JobAlerts";
import SavedJobsPage from "./pages/saved-job";
import Courses from "./pages/Courses";
import Company from "./pages/Company";
import CareerAdvice from "./pages/CareerAdvice";
import NoPage from "./pages/NoPage";
import Footer from "./components/Footer";
import CVEditor from "./components/CVEditor";
import CoursesHome from "./components/CoursesHome";
import OnlineCourse from "./components/OnlineCourse";
import Stafftraining from "./components/Stafftraining";
import Apprenthiceship from "./CarrerAdvice/Apprenthiceship";
import CarrerDevelopment from "./CarrerAdvice/CarrerDevelopment";
import CoverLater from "./CarrerAdvice/CoverLater";
import Cvs from "./CarrerAdvice/Cvs";
import Graduates from "./CarrerAdvice/Graduates";
import GettingStarted from "./CarrerAdvice/GettingStarted";
import Interviews from "./CarrerAdvice/Interviews";
import WorkLife from "./CarrerAdvice/WorkLife";
import HomeAdvice from "./CarrerAdvice/HomeAdvice";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route index element={<Home />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/job-details/:id" element={<JobDetails1 />} />
        <Route path="/searchjob" element={<SearchJob />} />
        <Route path="/secondSearch-Result" element={<SecondSearchResult />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/courseshome" element={<CoursesHome />} />
        <Route path="/onlinecourses" element={<OnlineCourse />} />
        <Route path="/stafftraining" element={<Stafftraining />} />
        <Route path="/jobdetails" element={<JobDetails />} />
        <Route path="/saved-jobs" element={<SavedJobsPage />} />

        <Route path="/cvbuilder" element={<CvBuilder />} />
        <Route path="/cveditor" element={<CVEditor />} />
        <Route path="/jobalerts" element={<JobAlerts />} />
        <Route path="/courses" element={<CoursesHome />} />
        <Route path="/company" element={<Company />} />
        <Route
          path="/carrerAdvice/Apprenthiceship"
          element={<Apprenthiceship />}
        />
        <Route
          path="/carrerAdvice/carrerDevelopment"
          element={<CarrerDevelopment />}
        />
        <Route path="/carrerAdvice/graduates" element={<Graduates />} />
        <Route path="/carrerAdvice/coverLater" element={<CoverLater />} />
        <Route
          path="/carrerAdvice/GettingStarted"
          element={<GettingStarted />}
        />
        <Route path="/carrerAdvice/worklife" element={<WorkLife />} />
        <Route path="/carrerAdvice/cvs" element={<Cvs />} />
        <Route path="/carrerAdvice/Interviews" element={<Interviews />} />
        <Route path="/careeradvice" element={<HomeAdvice />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
