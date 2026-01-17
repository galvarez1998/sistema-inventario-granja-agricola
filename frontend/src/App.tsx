import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./features/auth/Login";
import Dashboard from "./pages/Dashboard";
import AnimalList from "./features/animals/AnimalList";
import AnimalForm from "./features/animals/AnimalForm";
import ProductsPage from "./pages/ProductsPage";
import ProductionPage from "./pages/ProductionPage";
import SalesPage from "./pages/SalesPage";
import MovementsPage from "./pages/MovementsPage";
import HivesPage from "./pages/HivesPage";
import HiveForm from "./features/hives/HiveForm";
import ProductForm from "./features/products/ProductForm";
import ProductionForm from "./features/production/ProductionForm";
import SalesForm from "./features/sales/SalesForm";
import MovementForm from "./features/movements/MovementForm";
import Layout from "./components/Layout";
import Header from "./components/Header";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { Toaster } from "react-hot-toast";

function ProtectedRoute({ children, roles }: { children: JSX.Element; roles?: string[] }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return <Layout>{children}</Layout>;
}

export default function App() {
  return (
    <AuthProvider>
      <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
        <Toaster />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/animals"
            element={
              <ProtectedRoute>
                <AnimalList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/animals/new"
            element={
              <ProtectedRoute roles={["admin", "worker"]}>
                <AnimalForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/animals/:id/edit"
            element={
              <ProtectedRoute roles={["admin", "worker"]}>
                <AnimalForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/new"
            element={
              <ProtectedRoute roles={["admin", "worker"]}>
                <ProductForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:id/edit"
            element={
              <ProtectedRoute roles={["admin", "worker"]}>
                <ProductForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/production"
            element={
              <ProtectedRoute>
                <ProductionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/production/new"
            element={
              <ProtectedRoute roles={["admin", "worker"]}>
                <ProductionForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/production/:id/edit"
            element={
              <ProtectedRoute roles={["admin", "worker"]}>
                <ProductionForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sales"
            element={
              <ProtectedRoute>
                <SalesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sales/new"
            element={
              <ProtectedRoute roles={["admin", "worker"]}>
                <SalesForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sales/:id/edit"
            element={
              <ProtectedRoute roles={["admin", "worker"]}>
                <SalesForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movements"
            element={
              <ProtectedRoute>
                <MovementsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movements/new"
            element={
              <ProtectedRoute roles={["admin", "worker"]}>
                <MovementForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movements/:id/edit"
            element={
              <ProtectedRoute roles={["admin", "worker"]}>
                <MovementForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hives"
            element={
              <ProtectedRoute>
                <HivesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hives/new"
            element={
              <ProtectedRoute roles={["admin", "worker"]}>
                <HiveForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hives/:id/edit"
            element={
              <ProtectedRoute roles={["admin", "worker"]}>
                <HiveForm />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}