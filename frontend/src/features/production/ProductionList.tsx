import React from "react";
import { useQuery } from "@tanstack/react-query";
import { productionService, Production } from "../../api/productionService";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

async function fetchProduction(): Promise<Production[]> {
  return productionService.list();
}

export default function ProductionList() {
  const { data, isLoading, error, refetch } = useQuery<Production[]>(["production"], fetchProduction);

  if (isLoading) return <div className="p-4">Cargando producción...</div>;
  if (error) return <div className="p-4 text-red-600">Error al cargar</div>;

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Seguro que deseas eliminar este registro?")) {
      try {
        await productionService.remove(id);
        toast.success("Producción eliminada");
        refetch();
      } catch {
        toast.error("Error al eliminar");
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Producción</h1>
        <Link to="/production/new" className="bg-green-600 text-white px-4 py-2 rounded">Nuevo</Link>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="border px-4 py-2">Tipo</th>
            <th className="border px-4 py-2">Fecha</th>
            <th className="border px-4 py-2">Huevos (cantidad)</th>
            <th className="border px-4 py-2">Miel (L)</th>
            <th className="border px-4 py-2">Ganancia Peso (kg)</th>
            <th className="border px-4 py-2">Referencia</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((prod) => (
            <tr key={prod.id}>
              <td className="border px-4 py-2 capitalize">{prod.tipo}</td>
              <td className="border px-4 py-2">{prod.fecha ? new Date(prod.fecha).toLocaleDateString() : "-"}</td>
              <td className="border px-4 py-2">{prod.cantidadHuevos ?? "-"}</td>
              <td className="border px-4 py-2">{prod.cantidadMiel ?? "-"}</td>
              <td className="border px-4 py-2">{prod.gananciaPeso ?? "-"}</td>
              <td className="border px-4 py-2">{prod.referencia ?? "-"}</td>
              <td className="border px-4 py-2">
                <Link to={`/production/${prod.id}/edit`} className="text-blue-600 mr-2">Editar</Link>
                <button onClick={() => handleDelete(prod.id)} className="text-red-600">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
