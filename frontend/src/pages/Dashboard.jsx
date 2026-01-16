import React, { useEffect, useState } from "react";
import API, { setToken } from "../services/api";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setToken(token);
    API.get("/dashboard/summary")
      .then((r) => setSummary(r.data))
      .catch((e) => console.error(e));
  }, []);

  if (!summary) return <div>Cargando...</div>;

  const animalLabels = Object.keys(summary.animalsByType || {});
  const animalData = Object.values(summary.animalsByType || {});

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>
      <div style={{ width: 600 }}>
        <h3>Cantidad de animales por tipo</h3>
        <Bar data={{ labels: animalLabels, datasets: [{ label: "Animales", data: animalData, backgroundColor: "rgba(75,192,192,0.6)" }] }} />
      </div>

      <div>
        <h3>Producción total de miel: {summary.totalMiel}</h3>
        <h3>Carne producida (kg): {summary.carneProducida}</h3>
      </div>
    </div>
  );
}