
  import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => localStorage.getItem("token"));

  const login = (token) => {
    localStorage.setItem("token", token);
    setUser(token);
    navigate("/home");
  };
  const logout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;



// import React, { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }
//     setLoading(false);
//   }, []);

//   const login = (token) => {
//     localStorage.setItem("token", token);
//     setIsAuthenticated(true);
//     navigate("/home");
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setIsAuthenticated(false);
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;