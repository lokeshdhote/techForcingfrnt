import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-zinc-100 text-gray-800">
      {/* Navbar */}
      <Navbar />

      {/* Background image with opacity */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-opacity-50 bg-cover bg-center"
        style={{ backgroundImage: "url('https://career.techforing.com/assets/images/hero-bg.jpg')" }}
      ></div>

      {/* Content Section */}
      <div className="relative z-10 text-center p-6 max-w-lg mx-auto mt-6">
        {/* Heading and Subheading */}
        <h1 className="text-5xl font-bold mb-4 text-gray-800 drop-shadow-lg">
          Welcome to TechForing Careers
        </h1>
        <p className="text-lg mb-6 text-gray-600">
          Find the latest job opportunities or post your own opening with top companies.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex justify-center gap-6">
          <button
 className="border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-lightblue-600 font-semibold px-6 py-3 rounded-lg transition transform hover:scale-105"
            onClick={() => navigate("/jobs")}
          >
            View Job Listings
          </button>
          <button
            className="border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-lightblue-600 font-semibold px-6 py-3 rounded-lg transition transform hover:scale-105"
            onClick={() => navigate("/create")}
          >
            Post a New Job
          </button>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="absolute bottom-10 text-center w-full text-gray-600">
        <p className="text-sm mb-2">Powered by TechForing</p>
        <p className="text-sm">Explore top talent and job openings in one place</p>
      </div>
    </div>
  );
};

export default Home;
