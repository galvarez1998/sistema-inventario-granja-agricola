import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { salesService, Sale } from "../api/salesService";

export default function SalesPage() {
  const { data, isLoading, error, refetch } = useQuery<Sale[]>(
    ["sales"],
    () => salesService.list()
  );

  if (isLoading) return <div className="p-4">Cargando ventas...</div>;
  if (error) return <div className="p-4 text-red-600">Error al cargar</div>;

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Seguro que deseas eliminar esta venta?")) {
      try {
        await salesService.remove(id);
        toast.success("Venta eliminada");
        refetch();
      } catch {
        toast.error("Error al eliminar");
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Ventas</h1>
        <Link to="/sales/new" className="bg-green-600 text-white px-4 py-2 rounded">Nueva Venta</Link>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="border px-4 py-2">Tipo</th>
            <th className="border px-4 py-2">Cantidad</th>
            <th className="border px-4 py-2">Precio Total</th>
            <th className="border px-4 py-2">Fecha</th>
            <th className="border px-4 py-2">Notas</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((s: Sale) => (
            <tr key={s.id}>
              <td className="border px-4 py-2 capitalize">{s.tipo}</td>
              <td className="border px-4 py-2">{s.cantidad}</td>
              <td className="border px-4 py-2">${s.precioTotal.toFixed(2)}</td>
              <td className="border px-4 py-2">{new Date(s.fecha).toLocaleDateString()}</td>
              <td className="border px-4 py-2 text-sm">{s.notas ?? "-"}</td>
              <td className="border px-4 py-2">
                <Link to={`/sales/${s.id}/edit`} className="text-blue-600 mr-2">Editar</Link>
                <button onClick={() => handleDelete(s.id)} className="text-red-600">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
