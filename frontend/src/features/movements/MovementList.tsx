import React from "react";
import { useQuery } from "@tanstack/react-query";
import { movementsService, Movement } from "../../api/movementsService";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

async function fetchMovements(): Promise<Movement[]> {
  return movementsService.list();
}

export default function MovementList() {
  const { data, isLoading, error, refetch } = useQuery<Movement[]>(["movements"], fetchMovements);

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
        <Link to="/movements/new" className="bg-green-600 text-white px-4 py-2 rounded">Nuevo</Link>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="border px-4 py-2">Tipo</th>
            <th className="border px-4 py-2">Especie</th>
            <th className="border px-4 py-2">Cantidad</th>
            <th className="border px-4 py-2">Fecha</th>
            <th className="border px-4 py-2">Notas</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((mov) => (
            <tr key={mov.id}>
              <td className="border px-4 py-2 capitalize">{mov.tipo}</td>
              <td className="border px-4 py-2">{mov.especie}</td>
              <td className="border px-4 py-2">{mov.cantidad}</td>
              <td className="border px-4 py-2">{mov.fecha ? new Date(mov.fecha).toLocaleDateString() : "-"}</td>
              <td className="border px-4 py-2">{mov.notas ?? "-"}</td>
              <td className="border px-4 py-2">
                <Link to={`/movements/${mov.id}/edit`} className="text-blue-600 mr-2">Editar</Link>
                <button onClick={() => handleDelete(mov.id)} className="text-red-600">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
