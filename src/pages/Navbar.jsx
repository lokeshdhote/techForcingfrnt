import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);


  const ye = () => {
    console.log("Logout clicked");
    // logout();
    // console.log("User after logout:", user);
    // navigate("/login"); // optional
  };
  const handleLogin = () => {
    console.log("Login clicked");
    navigate("/login");
  };

  const isLoggedIn = !!user;

  return (
    <nav className="w-full bg-blue-500 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
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

        {/* Auth Button */}
        {user ? (
          <button
       onClick={ye}
            className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
