import React from "react";
import { useQuery } from "@tanstack/react-query";
import API from "../api/api";
import { Bar } from "react-chartjs-2";

export default function Dashboard() {
  const { data, isLoading } = useQuery(["dashboard"], async () => {
    const res = await API.get("/dashboard/summary");
    return res.data;
  });

  if (isLoading) return <div className="p-4">Cargando...</div>;
  const animalsByType = data.animalsByType || {};
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Dashboard</h1>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="mb-2">Animales por tipo</h3>
        <Bar data={{ labels: Object.keys(animalsByType), datasets: [{ label: "Animales", data: Object.values(animalsByType), backgroundColor: "rgba(59,130,246,0.6)" }] }} />
      </div>
      <div className="mt-4">
        <p>Total miel: {data.totalMiel}</p>
        <p>Carne producida (kg): {data.carneProducida}</p>
      </div>
    </div>
  );
}