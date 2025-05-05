import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import Navbar from "./Navbar";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);  // For handling errors
  const { isAuthenticated, user } = useContext(AuthContext); // Assuming `user` is part of the AuthContext

  // Get the token from localStorage or context if it's available
  const token = localStorage.getItem("token") || (isAuthenticated ? user?.token : null);

  const fetchJobs = async () => {
    setError(null);  // Reset error state on fetch attempt
    try {
      if (!token) {
        setError("You need to be logged in to view the jobs.");
        return;
      }

      const res = await axios.get(
        // "http://localhost:5000/api/jobs",
        "https://techforcinfbcknd.onrender.com/api/jobs", 
       
         {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials:true,
      });
      setJobs(res.data);
    } catch (err) {
      setError("Error fetching jobs. Please try again.");
      console.error("Error fetching jobs:", err);
    }
  };

  const deleteJob = async (id) => {
    try {
      await axios.delete(
        `https://techforcinfbcknd.onrender.com/api/jobs/${id}`,

        // `  http://localhost:5000/api/jobs/${id}`,
         {
        headers: { Authorization: `Bearer ${token}` }, withCredentials:true,
      }, );
      fetchJobs(); // Refresh job listings after deletion
    } catch (err) {
      setError("Error deleting job. Please try again.");
      console.error("Error deleting job:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10 mt-4">Job Listings</h1>

      {/* Display error message if there's an issue */}
      {error && (
        <div className="bg-red-500 text-white p-4 rounded-lg text-center mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {jobs.length === 0 ? (
          <div className="col-span-3 text-center text-gray-600">
            <p>No jobs available at the moment. Please check back later.</p>
          </div>
        ) : (
          jobs.map((job) => (
            <div key={job._id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-transform transform hover:scale-105">
              <h2 className="text-xl font-medium text-gray-900 mb-2"> <strong>Title :</strong> {job.title}</h2>
              <p className="text-gray-600 font-medium"> <strong>Company :</strong> {job.company}</p>
              <p className="text-gray-600"> <strong>Location :</strong> {job.location}</p>

              {/* Displaying additional job details */}
              {job.salary && (
                <p className="mt-3 text-gray-700"><strong>Salary:</strong> {job.salary}</p>
              )}

              {/* Ensure job.skills is an array before calling join() */}
              {job.skills && Array.isArray(job.skills) ? (
                <p className="mt-3 text-gray-700"><strong>Skills Required:</strong> {job.skills.join(', ')}</p>
              ) : (
                job.skills && (
                  <p className="mt-3 text-gray-700"><strong>Skills Required:</strong> {job.skills}</p>
                )
              )}

              {job.description && (
                <p className="mt-3 text-gray-700"><strong>Description:</strong> {job.description}</p>
              )}

              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => deleteJob(job._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Jobs;
