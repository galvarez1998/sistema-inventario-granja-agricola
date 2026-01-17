import React from "react";
import { useQuery } from "@tanstack/react-query";
import API from "../api/api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const { data, isLoading } = useQuery(["dashboard"], async () => {
    const res = await API.get("/dashboard/summary");
    return res.data;
  });

  if (isLoading) return <div style={{ padding: "1rem" }}>Cargando...</div>;
  if (!data) return <div style={{ padding: "1rem" }}>Sin datos</div>;
  
  const animalsByType = data.animalsByType || {};
  const chartData = {
    labels: Object.keys(animalsByType),
    datasets: [
      {
        label: "Cantidad de Animales",
        data: Object.values(animalsByType),
        backgroundColor: "rgba(34, 197, 94, 0.6)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 1,
      },
    ],
  };

  const cardStyle = {
    padding: "1rem",
    borderRadius: "0.5rem",
    border: "1px solid #e5e7eb",
    marginBottom: "1rem",
  };

  const titleStyle = {
    fontSize: "1.875rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
    color: "#1f2937",
  };

  const statsContainerStyle = {
    display: "flex" as const,
    justifyContent: "center" as const,
    gap: "2rem",
    marginBottom: "2rem",
    flexWrap: "wrap" as const,
  };

  return (
    <div style={{ 
      display: "flex",
      flexDirection: "column",
      height: "100%",
      width: "100%",
      backgroundColor: "#f3f4f6",
      overflowY: "auto",
      overflowX: "hidden"
    }}>
      <div style={{ 
        flex: "1",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column"
      }}>
        <div style={{ 
          maxWidth: "1400px", 
          width: "100%",
          margin: "0 auto", 
          backgroundColor: "white", 
          borderRadius: "0.5rem", 
          padding: "1.5rem", 
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          flex: "1"
        }}>
          <h1 style={titleStyle}>📊 Dashboard - Granja</h1>
          
          <div style={statsContainerStyle}>
            <div style={{ ...cardStyle, backgroundColor: "#f0fdf4", borderColor: "#86efac", minWidth: "160px", textAlign: "center", flex: "1 1 160px" }}>
              <p style={{ color: "#666", fontSize: "0.875rem", marginBottom: "0.5rem" }}>🍯 Total Miel</p>
              <p style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#22c55e" }}>{data.totalMiel || 0} L</p>
            </div>
            <div style={{ ...cardStyle, backgroundColor: "#eff6ff", borderColor: "#93c5fd", minWidth: "160px", textAlign: "center", flex: "1 1 160px" }}>
              <p style={{ color: "#666", fontSize: "0.875rem", marginBottom: "0.5rem" }}>🥩 Carne Producida</p>
              <p style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#3b82f6" }}>{data.carneProducida || 0} kg</p>
            </div>
            <div style={{ ...cardStyle, backgroundColor: "#faf5ff", borderColor: "#d8b4fe", minWidth: "160px", textAlign: "center", flex: "1 1 160px" }}>
              <p style={{ color: "#666", fontSize: "0.875rem", marginBottom: "0.5rem" }}>🥚 Huevos</p>
              <p style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#a855f7" }}>{data.totalHuevos || 0}</p>
            </div>
          </div>

          <div style={{ ...cardStyle, backgroundColor: "white", width: "100%", boxSizing: "border-box", flex: "1", display: "flex", flexDirection: "column" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem", color: "#1f2937" }}>Animales por Especie</h3>
            <div style={{ height: "100%", minHeight: "300px", position: "relative", width: "100%", boxSizing: "border-box", flex: "1" }}>
              <Bar 
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: true,
                      position: "top",
                    },
                    title: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}