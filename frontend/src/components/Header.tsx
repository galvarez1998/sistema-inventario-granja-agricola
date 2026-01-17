import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { label: "📊 Dashboard", path: "/" },
    { label: "🐄 Animales", path: "/animals" },
    { label: "📦 Productos", path: "/products" },
    { label: "📈 Producción", path: "/production" },
    { label: "💰 Ventas", path: "/sales" },
    { label: "📋 Movimientos", path: "/movements" },
    { label: "🐝 Colmenas", path: "/hives" },
  ];

  return (
    <header style={{
      backgroundColor: "#1f2937",
      color: "white",
      padding: "1rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      flexWrap: "wrap",
      gap: "1rem"
    }}>
      <div style={{ fontSize: "1.5rem", fontWeight: "bold", cursor: "pointer" }} onClick={() => navigate("/")} >
        🌾 Granja Inventario
      </div>
      
      <nav style={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        justifyContent: "center",
        flex: "1"
      }}>
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
              padding: "0.5rem 1rem",
              borderRadius: "0.25rem",
              fontSize: "0.875rem",
              transition: "background-color 0.3s",
              whiteSpace: "nowrap"
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#374151"}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div style={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        whiteSpace: "nowrap"
      }}>
        {user && (
          <span style={{ fontSize: "0.875rem" }}>
            👤 {user.username} ({user.role})
          </span>
        )}
        {user && (
          <button 
            onClick={handleLogout}
            style={{
              backgroundColor: "#dc2626",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "0.25rem",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: "500",
              transition: "background-color 0.3s"
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#b91c1c"}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#dc2626"}
          >
            Cerrar Sesión
          </button>
        )}
      </div>
    </header>
  );
}