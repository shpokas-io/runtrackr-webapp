import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem("strava_token") || null
  );

  useEffect(() => {
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

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
