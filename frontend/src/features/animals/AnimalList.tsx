import React from "react";
import { useQuery } from "@tanstack/react-query";
import API from "../../api/api";
import { Link } from "react-router-dom";

type Animal = {
  id: string;
  especie: string;
  cantidad: number;
  estado: string;
  peso?: number;
  fechaIngreso?: string;
};

async function fetchAnimals(): Promise<Animal[]> {
  const res = await API.get("/animals");
  return res.data;
}

export default function AnimalList() {
  const { data, isLoading, error, refetch } = useQuery(["animals"], fetchAnimals);

  if (isLoading) return <div className="p-4">Cargando animales...</div>;
  if (error) return <div className="p-4 text-red-600">Error al cargar</div>;

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
            <th className="border px-4 py-2">Estado</th>
            <th className="border px-4 py-2">Peso (kg)</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((a) => (
            <tr key={a.id}>
              <td className="border px-4 py-2">{a.especie}</td>
              <td className="border px-4 py-2">{a.cantidad}</td>
              <td className="border px-4 py-2">{a.estado}</td>
              <td className="border px-4 py-2">{a.peso ?? "-"}</td>
              <td className="border px-4 py-2">
                <Link to={`/animals/${a.id}/edit`} className="text-blue-600 mr-2">Editar</Link>
                <button onClick={() => { /* eliminar */ }} className="text-red-600">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}