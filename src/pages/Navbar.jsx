import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogin = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-blue-500 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Back Button (Arrow) */}
        <button
          onClick={() => navigate(-1)} // Navigate back to the previous page
          className="p-2 rounded-full hover:bg-blue-700 transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Title */}
        <h1 className="text-2xl font-semibold">Job Portal</h1>

        {/* Login/Logout Button */}
        <button
          onClick={handleLogin}  // Show logout if user is authenticated
          className="px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-800 transition duration-300"
        >
         Logout {/* Show "Logout" if user is authenticated, otherwise "Login" */}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
