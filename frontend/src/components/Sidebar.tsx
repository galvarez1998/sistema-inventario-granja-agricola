import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-60 bg-white shadow-inner p-4">
      <nav className="flex flex-col gap-2">
        <Link to="/" className="text-sm">Dashboard</Link>
        <Link to="/animals" className="text-sm">Animales</Link>
        <Link to="/products" className="text-sm">Productos</Link>
        <Link to="/movements" className="text-sm">Movimientos</Link>
        <Link to="/production" className="text-sm">Producción</Link>
        <Link to="/sales" className="text-sm">Ventas</Link>
      </nav>
    </aside>
  );
}