import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { movementsService, Movement } from "../api/movementsService";

export default function MovementsPage() {
  const { data, isLoading, error, refetch } = useQuery<Movement[]>(
    ["movements"],
    () => movementsService.list()
  );

  if (isLoading) return <div className="p-4">Cargando movimientos...</div>;
  if (error) return <div className="p-4 text-red-600">Error al cargar</div>;

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Seguro que deseas eliminar este movimiento?")) {
      try {
        await movementsService.remove(id);
        toast.success("Movimiento eliminado");
        refetch();
      } catch {
        toast.error("Error al eliminar");
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Movimientos</h1>
        <Link to="/movements/new" className="bg-green-600 text-white px-4 py-2 rounded">Nuevo Movimiento</Link>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="border px-4 py-2">Tipo</th>
            <th className="border px-4 py-2">Especie</th>
            <th className="border px-4 py-2">Cantidad</th>
            <th className="border px-4 py-2">Notas</th>
            <th className="border px-4 py-2">Fecha</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((m: Movement) => (
            <tr key={m.id}>
              <td className="border px-4 py-2 capitalize">{m.tipo}</td>
              <td className="border px-4 py-2">{m.especie}</td>
              <td className="border px-4 py-2">{m.cantidad}</td>
              <td className="border px-4 py-2 text-sm">{m.notas ?? "-"}</td>
              <td className="border px-4 py-2">{new Date(m.fecha).toLocaleDateString()}</td>
              <td className="border px-4 py-2">
                <Link to={`/movements/${m.id}/edit`} className="text-blue-600 mr-2">Editar</Link>
                <button onClick={() => handleDelete(m.id)} className="text-red-600">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
