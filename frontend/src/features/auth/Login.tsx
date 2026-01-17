import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";

const schema = z.object({
  username: z.string().min(1, "Requerido"),
  password: z.string().min(1, "Requerido")
});
type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const { register, handleSubmit, formState } = useForm<FormData>({ resolver: zodResolver(schema) });
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await API.post("/auth/login", data);
      const { token } = res.data;
      await login(token);
      toast.success("Ingreso correcto");
      navigate("/");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Error de login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-700 mb-2">🌾</h1>
          <h2 className="text-2xl font-semibold text-gray-800">Sistema de Inventario</h2>
          <p className="text-gray-500 text-sm mt-2">Granja Agrícola</p>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2 text-center">Usuario</label>
          <input 
            {...register("username")} 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition text-center"
            placeholder="usuario"
          />
          {formState.errors.username && (
            <p className="text-red-500 text-sm mt-1 text-center">{formState.errors.username.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2 text-center">Contraseña</label>
          <input 
            type="password" 
            {...register("password")} 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition text-center"
            placeholder="••••••••"
          />
          {formState.errors.password && (
            <p className="text-red-500 text-sm mt-1 text-center">{formState.errors.password.message}</p>
          )}
        </div>

        <button 
          type="submit" 
          disabled={formState.isSubmitting}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
        >
          {formState.isSubmitting ? "Ingresando..." : "Entrar"}
        </button>

        <p className="text-center text-gray-500 text-xs mt-6">
          © 2026 Sistema de Inventario Granja
        </p>
      </form>
    </div>
  );
}