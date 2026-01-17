import React from "react";
import { useAuth } from "../hooks/useAuth";

export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Granja - Inventario</div>
      <div className="flex items-center gap-4">
        {user && <div className="text-sm">Hola, {user.username} ({user.role})</div>}
        {user && <button onClick={logout} className="text-sm text-red-600">Cerrar sesión</button>}
      </div>
    </header>
  );
}