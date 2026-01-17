import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./features/auth/Login";
import Dashboard from "./pages/Dashboard";
import AnimalList from "./features/animals/AnimalList";
import AnimalForm from "./features/animals/AnimalForm";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { Toaster } from "react-hot-toast";

function ProtectedRoute({ children, roles }: { children: JSX.Element; roles?: string[] }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}