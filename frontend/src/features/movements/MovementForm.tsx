import React from "react";
import { useForm } from "react-hook-form";
import { movementsService } from "../../api/movementsService";
import Layout from "../../components/Layout";
import toast from "react-hot-toast";

export default function MovementForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data: any) => {
    try {
      await movementsService.create(data);
      toast.success("Movimiento registrado");
    } catch {
      toast.error("Error");
    }
  };
  return (
    <Layout>
      <div className="p-4 max-w-xl">
        <h2 className="mb-4">Registrar Movimiento</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label>Tipo</label>
            <select {...register("tipo")} className="w-full border p-2 rounded">
              <option value="nacimiento">Nacimiento</option>
              <option value="muerte">Muerte</option>
              <option value="venta">Venta</option>
              <option value="compra">Compra</option>
            </select>
          </div>
          <div>
            <label>Especie</label>
            <input {...register("especie")} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label>Cantidad</label>
            <input type="number" {...register("cantidad", { valueAsNumber: true })} className="w-full border p-2 rounded" />
          </div>
          <div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Registrar</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}