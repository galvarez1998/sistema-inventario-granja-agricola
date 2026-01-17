import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { productService, Product } from "../api/productService";

export default function ProductsPage() {
  const { data, isLoading, error, refetch } = useQuery<Product[]>(
    ["products"],
    () => productService.list()
  );

  if (isLoading) return <div className="p-4">Cargando productos...</div>;
  if (error) return <div className="p-4 text-red-600">Error al cargar</div>;

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      try {
        await productService.remove(id);
        toast.success("Producto eliminado");
        refetch();
      } catch {
        toast.error("Error al eliminar");
      }
    }
  };

  const getProductDetails = (p: Product) => {
    if (p.tipo === "carne") return `${p.procedencia} - ${p.peso}kg`;
    if (p.tipo === "huevo") return `${p.cantidadHuevos} unidades`;
    if (p.tipo === "miel") return `${p.cantidadMiel}L`;
    return "-";
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Productos</h1>
        <Link to="/products/new" className="bg-green-600 text-white px-4 py-2 rounded">Nuevo</Link>
      </div>

      <table className="min-w-full bg-white text-sm">
        <thead>
          <tr>
            <th className="border px-4 py-2">Tipo</th>
            <th className="border px-4 py-2">Detalles</th>
            <th className="border px-4 py-2">Fecha</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((p: Product) => (
            <tr key={p.id}>
              <td className="border px-4 py-2 capitalize">{p.tipo}</td>
              <td className="border px-4 py-2">{getProductDetails(p)}</td>
              <td className="border px-4 py-2">
                {p.tipo === "carne" && p.fechaSacrificio ? new Date(p.fechaSacrificio).toLocaleDateString() : 
                 p.tipo === "huevo" && p.fechaRecoleccionHuevos ? new Date(p.fechaRecoleccionHuevos).toLocaleDateString() :
                 p.tipo === "miel" && p.fechaExtraccionMiel ? new Date(p.fechaExtraccionMiel).toLocaleDateString() :
                 "-"}
              </td>
              <td className="border px-4 py-2">
                <Link to={`/products/${p.id}/edit`} className="text-blue-600 mr-2">Editar</Link>
                <button onClick={() => handleDelete(p.id)} className="text-red-600">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
