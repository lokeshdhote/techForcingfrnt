import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../AuthContext'; 
import Navbar from './Navbar';

const CreateJob = () => {
  const [job, setJob] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    salary: '',
    skills: '', // New field for skills
  });

  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 
  const { isAuthenticated, user } = useContext(AuthContext); 

  const token = localStorage.getItem("token") || (isAuthenticated ? user?.token : null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); 

    if (!token) {
      setError("No authentication token found. Please login.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(job),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      navigate('/jobs');
    } catch (err) {
      setError(err.message); 
      console.error('Error creating job:', err);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navbar/>

      {/* Main Content */}
      <div className="flex-1 flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-3xl p-8 bg-white shadow-lg rounded-xl">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create a New Job</h2>

          {error && (
            <div className="text-red-600 text-center mb-4">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-gray-700 font-medium">Job Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={job.title}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="company" className="text-gray-700 font-medium">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={job.company}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="text-gray-700 font-medium">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={job.location}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-gray-700 font-medium">Job Description</label>
              <textarea
                id="description"
                name="description"
                value={job.description}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300"
                rows="6"
                required
              />
            </div>

            {/* New Salary Input */}
            <div className="space-y-2">
              <label htmlFor="salary" className="text-gray-700 font-medium">Salary</label>
              <input
                type="text"
                id="salary"
                name="salary"
                value={job.salary}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
            </div>

            {/* New Skills Input */}
            <div className="space-y-2">
              <label htmlFor="skills" className="text-gray-700 font-medium">Skills (comma separated)</label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={job.skills}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
              <small className="text-gray-500">Enter skills separated by commas (e.g., React, Node.js, MongoDB).</small>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                disabled={loading}
              >
                {loading ? 'Creating Job...' : 'Create Job'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
