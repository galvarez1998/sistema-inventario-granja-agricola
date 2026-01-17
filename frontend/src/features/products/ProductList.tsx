import React from "react";
import { useQuery } from "@tanstack/react-query";
import { productsService } from "../../api/productsService";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

export default function ProductList() {
  const { data, isLoading } = useQuery(["products"], productsService.list);
  if (isLoading) return <div>Cargando...</div>;
  return (
    <Layout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl">Productos</h1>
          <Link to="/products/new" className="bg-green-600 text-white px-4 py-2 rounded">Nuevo</Link>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="border px-4 py-2">Tipo</th>
              <th className="border px-4 py-2">Procedencia/Origen</th>
              <th className="border px-4 py-2">Cantidad / Peso</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((p: any) => (
              <tr key={p.id}>
                <td className="border px-4 py-2">{p.tipo}</td>
                <td className="border px-4 py-2">{p.procedencia ?? p.colmenaOrigen ?? "-"}</td>
                <td className="border px-4 py-2">{p.tipo === "carne" ? `${p.peso ?? "-"} kg` : p.tipo === "huevo" ? `${p.cantidadHuevos ?? "-"} uds` : `${p.cantidadMiel ?? "-"} L`}</td>
                <td className="border px-4 py-2">Editar | Eliminar</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}