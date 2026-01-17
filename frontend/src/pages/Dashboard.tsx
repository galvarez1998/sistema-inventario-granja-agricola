import React from "react";
import { useQuery } from "@tanstack/react-query";
import API from "../api/api";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface StatCard {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export default function Dashboard() {
  const { data, isLoading } = useQuery(["dashboard"], async () => {
    const res = await API.get("/dashboard/summary");
    return res.data;
  });

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <div className="inline-block animate-spin">⏳</div> Cargando dashboard...
      </div>
    );
  }
  if (!data) return <div className="p-6 text-center text-red-600">Sin datos disponibles</div>;
  
  const animalsByType = data.animalsByType || {};
  const totalAnimals = Object.values(animalsByType).reduce((a: number, b: any) => a + (b || 0), 0);
  
  // Datos para gráfico de animales
  const chartDataAnimals = {
    labels: Object.keys(animalsByType),
    datasets: [
      {
        label: "Cantidad de Animales",
        data: Object.values(animalsByType),
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  // Datos para gráfico de producción
  const productionData = {
    labels: ["Miel", "Carne", "Huevos"],
    datasets: [
      {
        label: "Producción",
        data: [data.totalMiel || 0, data.carneProducida || 0, data.totalHuevos || 0],
        backgroundColor: [
          "rgba(251, 191, 36, 0.7)",
          "rgba(239, 68, 68, 0.7)",
          "rgba(167, 139, 250, 0.7)",
        ],
        borderColor: [
          "rgba(251, 191, 36, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(167, 139, 250, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const statCards: StatCard[] = [
    {
      title: "Total de Animales",
      value: totalAnimals,
      icon: "🐄",
      color: "#059669",
      bgColor: "#ecfdf5",
      borderColor: "#6ee7b7",
    },
    {
      title: "Total Miel",
      value: `${data.totalMiel || 0} L`,
      icon: "🍯",
      color: "#d97706",
      bgColor: "#fffbeb",
      borderColor: "#fcd34d",
    },
    {
      title: "Carne Producida",
      value: `${data.carneProducida || 0} kg`,
      icon: "🥩",
      color: "#dc2626",
      bgColor: "#fef2f2",
      borderColor: "#fecaca",
    },
    {
      title: "Huevos",
      value: data.totalHuevos || 0,
      icon: "🥚",
      color: "#7c3aed",
      bgColor: "#faf5ff",
      borderColor: "#e9d5ff",
    },
    {
      title: "Ventas Totales",
      value: `$${(data.totalSales || 0).toFixed(2)}`,
      icon: "💰",
      color: "#0891b2",
      bgColor: "#ecf0f1",
      borderColor: "#a1e0e0",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🌾 Dashboard - Granja Agrícola</h1>
          <p className="text-gray-600">Resumen general de tu operación agrícola</p>
        </div>

        {/* Stat Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {statCards.map((card, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg border-2 shadow-md hover:shadow-lg transition-shadow"
              style={{ backgroundColor: card.bgColor, borderColor: card.borderColor }}
            >
              <div className="text-3xl mb-2">{card.icon}</div>
              <p className="text-sm text-gray-600 mb-1">{card.title}</p>
              <p className="text-2xl font-bold" style={{ color: card.color }}>
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Animales por Especie - Bar Chart */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📊 Animales por Especie</h2>
            <div style={{ position: "relative", height: "300px", width: "100%" }}>
              <Bar
                data={chartDataAnimals}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  indexAxis: "x",
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    y: { beginAtZero: true },
                  },
                }}
              />
            </div>
          </div>

          {/* Producción - Doughnut Chart */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📈 Distribución de Producción</h2>
            <div style={{ position: "relative", height: "300px", width: "100%" }}>
              <Doughnut
                data={productionData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "bottom",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Resumen Rápido */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">📋 Resumen Rápido</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Total Animales:</span>
                <span className="font-bold text-lg">{totalAnimals}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Colmenas Activas:</span>
                <span className="font-bold text-lg">{data.hivesCount || 0}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Movimientos:</span>
                <span className="font-bold text-lg">{data.movementsCount || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Transacciones:</span>
                <span className="font-bold text-lg">{data.salesCount || 0}</span>
              </div>
            </div>
          </div>

          {/* Estado de Animales */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">🏥 Estado de Animales</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b">
                <span className="text-green-600 font-semibold">✓ Saludable</span>
                <span className="font-bold">{data.healthyAnimals || 0}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b">
                <span className="text-yellow-600 font-semibold">⚠ Enfermo</span>
                <span className="font-bold">{data.sickAnimals || 0}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b">
                <span className="text-orange-600 font-semibold">🏷 Vendido</span>
                <span className="font-bold">{data.soldAnimals || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-red-600 font-semibold">✕ Muerto</span>
                <span className="font-bold">{data.deadAnimals || 0}</span>
              </div>
            </div>
          </div>

          {/* Información Importante */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">⏰ Información Importante</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                <p className="font-semibold text-blue-700">Sistema Actualizado</p>
                <p className="text-blue-600">Todo funcionando correctamente</p>
              </div>
              <div className="bg-green-50 p-3 rounded border-l-4 border-green-500">
                <p className="font-semibold text-green-700">✓ Datos Sincronizados</p>
                <p className="text-green-600">Base de datos al día</p>
              </div>
              <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
                <p className="font-semibold text-purple-700">📊 Versión 1.0</p>
                <p className="text-purple-600">Sistema de Inventario</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg shadow-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-3">💡 Consejos de Uso</h3>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Mantén actualizados los registros de animales</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Registra cada movimiento y transacción</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Revisa regularmente los reportes de producción</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}