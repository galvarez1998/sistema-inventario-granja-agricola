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
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl mb-4">Ingresar</h2>
        <div className="mb-4">
          <label className="block mb-1">Usuario</label>
          <input {...register("username")} className="w-full border p-2 rounded" />
          {formState.errors.username && <p className="text-red-600">{formState.errors.username.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Contraseña</label>
          <input type="password" {...register("password")} className="w-full border p-2 rounded" />
          {formState.errors.password && <p className="text-red-600">{formState.errors.password.message}</p>}
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Entrar</button>
      </form>
    </div>
  );
}