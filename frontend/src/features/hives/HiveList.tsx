import React from "react";
import { useQuery } from "@tanstack/react-query";
import { hiveService, Hive } from "../../api/hiveService";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

async function fetchHives(): Promise<Hive[]> {
  return hiveService.list();
}

export default function HiveList() {
  const { data, isLoading, error, refetch } = useQuery<Hive[]>(["hives"], fetchHives);

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
        <Link to="/hives/new" className="bg-green-600 text-white px-4 py-2 rounded">Nueva</Link>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Última Producción (L)</th>
            <th className="border px-4 py-2">Ubicación</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((hive) => (
            <tr key={hive.id}>
              <td className="border px-4 py-2">{hive.nombre}</td>
              <td className="border px-4 py-2">{hive.ultimaProduccionLitros}</td>
              <td className="border px-4 py-2">{hive.ubicacion ?? "-"}</td>
              <td className="border px-4 py-2">
                <Link to={`/hives/${hive.id}/edit`} className="text-blue-600 mr-2">Editar</Link>
                <button onClick={() => handleDelete(hive.id)} className="text-red-600">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
