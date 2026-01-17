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
  const [token, setToken] = useState<string | null>(() => {
    // Recupera el token del localStorage al inicializar
    return localStorage.getItem("token");
  });
  const [user, setUser] = useState<User>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Efecto para inicializar el usuario desde el token al cargar
  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser({ id: payload.id, username: payload.username, role: payload.role });
      } catch (error) {
        console.error("Error decoding token:", error);
        setUser(null);
        localStorage.removeItem("token");
        setToken(null);
      }
    } else {
      setUser(null);
    }
    setIsInitialized(true);
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

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {isInitialized ? children : <div style={{ padding: "1rem" }}>Cargando...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};