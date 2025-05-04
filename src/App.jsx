import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";  // Import AuthContext here
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import CreateJob from "./pages/CreateJob";
import './App.css'; // or the appropriate path to your CSS file



const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);  // Use the AuthContext here
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/jobs" element={<PrivateRoute><Jobs /></PrivateRoute>} />
      <Route path="/create" element={<PrivateRoute><CreateJob /></PrivateRoute>} />
    </Routes>
  );
}

export default App;
