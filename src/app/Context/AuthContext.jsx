"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Восстановление токена
  useEffect(() => {
    const loadToken = async () => {
      if (typeof window === "undefined") return;
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        try {
          const jwtDecodeModule = await import("jwt-decode");
          const jwtDecode = jwtDecodeModule.default || jwtDecodeModule; // ✅
          const decoded = jwtDecode(savedToken);
          setUser(decoded);
          setToken(savedToken);
        } catch (err) {
          console.error("Ошибка декодирования токена", err);
          localStorage.removeItem("token");
        }
      }
    };
    loadToken();
  }, []);

  // LOGIN
  const login = async (email, password) => {
    const res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Ошибка входа");

    localStorage.setItem("token", data.token);

    const jwtDecodeModule = await import("jwt-decode");
    const jwtDecode = jwtDecodeModule.default || jwtDecodeModule; // ✅
    const decoded = jwtDecode(data.token);
    setUser(decoded);
    setToken(data.token);
    return data;
  };

  // REGISTER
  const register = async (formData) => {
    const res = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Ошибка регистрации");
    return data;
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
