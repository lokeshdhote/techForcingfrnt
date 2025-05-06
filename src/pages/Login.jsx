import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/Axios";
import { AuthContext } from "../AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext); 
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);  // To handle error messages
  const [loading, setLoading] = useState(false); // To manage loading state

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);  // Reset previous error
    setLoading(true); // Start loading indicator

    try {
      const res  = await  axios.post("/signin",{ email: form.email, password: form.password , } );
      console.log(res.data +"data");
      
      login(res.data.token);
        navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your credentials and try again.");
      
    }
    finally {
        setLoading(false); // Stop loading indicator
      }
    // try {
    //   const res = await axios.post(    {
    //       email: form.email,
    //       password: form.password,
    //     },
    //     {
    //       withCredentials: true,  // Send credentials with the request
    //     }
    //   );

    //   // Handle successful login
    //   login(res.data.token);
    //   navigate("/home");
    // } catch (err) {
    //   console.error("Login failed:", err);
    //   setError("Login failed. Please check your credentials and try again.");
    // } finally {
    //   setLoading(false); // Stop loading indicator
    // }
  };

  const handleRegisterRedirect = () => {
    navigate("/register"); // Redirect to the registration page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            disabled={loading}  // Disable button during loading
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Redirect to Register Page if User is not registered */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={handleRegisterRedirect}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
