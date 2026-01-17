import React from "react";
import { useQuery } from "@tanstack/react-query";
import { animalsService, Animal } from "../../api/animalsService";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

async function fetchAnimals(): Promise<Animal[]> {
  return animalsService.list();
}

export default function AnimalList() {
  const { data, isLoading, error, refetch } = useQuery<Animal[]>(["animals"], fetchAnimals);

  if (isLoading) return <div className="p-4">Cargando animales...</div>;
  if (error) return <div className="p-4 text-red-600">Error al cargar</div>;

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Seguro que deseas eliminar este animal?")) {
      try {
        await animalsService.remove(id);
        toast.success("Animal eliminado");
        refetch();
      } catch {
        toast.error("Error al eliminar");
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Animales</h1>
        <Link to="/animals/new" className="bg-green-600 text-white px-4 py-2 rounded">Nuevo</Link>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="border px-4 py-2">Especie</th>
            <th className="border px-4 py-2">Cantidad</th>
            <th className="border px-4 py-2">Peso (kg)</th>
            <th className="border px-4 py-2">Edad</th>
            <th className="border px-4 py-2">Estado</th>
            <th className="border px-4 py-2">F. Ingreso</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((a) => (
            <tr key={a.id}>
              <td className="border px-4 py-2">{a.especie}</td>
              <td className="border px-4 py-2">{a.cantidad}</td>
              <td className="border px-4 py-2">{a.peso ?? "-"}</td>
              <td className="border px-4 py-2">{a.edad ?? "-"}</td>
              <td className="border px-4 py-2 capitalize">{a.estado}</td>
              <td className="border px-4 py-2">{a.fechaIngreso ? new Date(a.fechaIngreso).toLocaleDateString() : "-"}</td>
              <td className="border px-4 py-2">
                <Link to={`/animals/${a.id}/edit`} className="text-blue-600 mr-2">Editar</Link>
                <button onClick={() => handleDelete(a.id)} className="text-red-600">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}