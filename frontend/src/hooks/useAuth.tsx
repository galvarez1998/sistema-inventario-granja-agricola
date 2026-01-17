import React, { createContext, useContext, useEffect, useState } from "react";
import API from "../api/api";

type User = { id: string; username: string; role: string } | null;

type AuthContextValue = {
  user: User;
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    if (token) {
      // Optional: fetch user profile from token or backend
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser({ id: payload.id, username: payload.username, role: payload.role });
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [token]);

  const login = async (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};