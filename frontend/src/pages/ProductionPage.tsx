import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { productionService, Production } from "../api/productionService";

export default function ProductionPage() {
  const { data, isLoading, error, refetch } = useQuery<Production[]>(
    ["production"],
    () => productionService.list()
  );

  if (isLoading) return <div className="p-4">Cargando producción...</div>;
  if (error) return <div className="p-4 text-red-600">Error al cargar</div>;

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Seguro que deseas eliminar este registro?")) {
      try {
        await productionService.remove(id);
        toast.success("Registro eliminado");
        refetch();
      } catch {
        toast.error("Error al eliminar");
      }
    }
  };

  const getQuantity = (p: Production) => {
    if (p.tipo === "huevos") return p.cantidadHuevos;
    if (p.tipo === "miel") return p.cantidadMiel;
    if (p.tipo === "peso") return p.gananciaPeso;
    return "-";
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
            <th className="border px-4 py-2">Cantidad</th>
            <th className="border px-4 py-2">Referencia</th>
            <th className="border px-4 py-2">Fecha</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((p: Production) => (
            <tr key={p.id}>
              <td className="border px-4 py-2 capitalize">{p.tipo}</td>
              <td className="border px-4 py-2">{getQuantity(p) ?? "-"}</td>
              <td className="border px-4 py-2">{p.referencia ?? "-"}</td>
              <td className="border px-4 py-2">{new Date(p.fecha).toLocaleDateString()}</td>
              <td className="border px-4 py-2">
                <Link to={`/production/${p.id}/edit`} className="text-blue-600 mr-2">Editar</Link>
                <button onClick={() => handleDelete(p.id)} className="text-red-600">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
