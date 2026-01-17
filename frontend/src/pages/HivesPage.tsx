import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { hiveService, Hive } from "../api/hiveService";

export default function HivesPage() {
  const { data, isLoading, error, refetch } = useQuery<Hive[]>(
    ["hives"],
    () => hiveService.list()
  );

  if (isLoading) return <div className="p-4">Cargando colmenas...</div>;
  if (error) return <div className="p-4 text-red-600">Error al cargar</div>;

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Seguro que deseas eliminar esta colmena?")) {
      try {
        await hiveService.remove(id);
        toast.success("Colmena eliminada");
        refetch();
      } catch {
        toast.error("Error al eliminar");
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Colmenas</h1>
        <Link to="/hives/new" className="bg-green-600 text-white px-4 py-2 rounded">Nueva Colmena</Link>
      </div>

      <table className="min-w-full bg-white text-sm">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Última Producción (L)</th>
            <th className="border px-4 py-2">Ubicación</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((h: Hive) => (
            <tr key={h.id}>
              <td className="border px-4 py-2">{h.nombre}</td>
              <td className="border px-4 py-2">{h.ultimaProduccionLitros}</td>
              <td className="border px-4 py-2">{h.ubicacion ?? "-"}</td>
              <td className="border px-4 py-2">
                <Link to={`/hives/${h.id}/edit`} className="text-blue-600 mr-2">Editar</Link>
                <button onClick={() => handleDelete(h.id)} className="text-red-600">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
