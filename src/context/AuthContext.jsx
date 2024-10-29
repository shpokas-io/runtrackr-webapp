/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem("strava_token") || null
  );

  useEffect(() => {
    // Sync token changes with localStorage
    if (token) {
      localStorage.setItem("strava_token", token);
    } else {
      localStorage.removeItem("strava_token");
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
