import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create Context
const AuthContext = createContext();

// Provide Context to the App
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log(user);
  

  // Fetch user on page load (persist authentication)
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
        
        
  
    if (token) {
      axios.get("http://127.0.0.1:5000/user", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => setUser(response.data.user))
        .catch(() => {
          setUser(null);
        //   localStorage.removeItem("auth_token"); // Remove invalid token
        });
    }
  }, []);


  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);
