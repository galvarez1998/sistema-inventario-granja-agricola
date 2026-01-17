import React from "react";
import { useQuery } from "@tanstack/react-query";
import { salesService, Sale } from "../../api/salesService";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

async function fetchSales(): Promise<Sale[]> {
  return salesService.list();
}

export default function SalesList() {
  const { data, isLoading, error, refetch } = useQuery<Sale[]>(["sales"], fetchSales);

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
        <Link to="/sales/new" className="bg-green-600 text-white px-4 py-2 rounded">Nueva</Link>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="border px-4 py-2">Tipo</th>
            <th className="border px-4 py-2">Referencia ID</th>
            <th className="border px-4 py-2">Cantidad</th>
            <th className="border px-4 py-2">Precio Total</th>
            <th className="border px-4 py-2">Fecha</th>
            <th className="border px-4 py-2">Notas</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((sale) => (
            <tr key={sale.id}>
              <td className="border px-4 py-2 capitalize">{sale.tipo}</td>
              <td className="border px-4 py-2">{sale.referenciaId}</td>
              <td className="border px-4 py-2">{sale.cantidad}</td>
              <td className="border px-4 py-2">${sale.precioTotal.toFixed(2)}</td>
              <td className="border px-4 py-2">{sale.fecha ? new Date(sale.fecha).toLocaleDateString() : "-"}</td>
              <td className="border px-4 py-2">{sale.notas ?? "-"}</td>
              <td className="border px-4 py-2">
                <Link to={`/sales/${sale.id}/edit`} className="text-blue-600 mr-2">Editar</Link>
                <button onClick={() => handleDelete(sale.id)} className="text-red-600">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
