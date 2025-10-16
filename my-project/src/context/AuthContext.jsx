import React, { createContext, useState, useEffect } from "react";
import { login, register } from "../service/authService";
import { getProfile } from "../service/userService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        try {
          const res = await getProfile(token);
          setUser(res.data.account);
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    fetchProfile();
  }, [token]);

  const handleLogin = async (credentials) => {
    const res = await login(credentials);
    const token = res.data?.access_token;
    setToken(token);
    localStorage.setItem("token", token);
    return res;
  };

  const handleRegister = async (data) => {
    const res = await register(data);
    return res;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, handleLogin, handleRegister, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;