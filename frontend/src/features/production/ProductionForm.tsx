import React from "react";
import { useForm } from "react-hook-form";
import { productionService } from "../../api/productionService";
import Layout from "../../components/Layout";
import toast from "react-hot-toast";

export default function ProductionForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data: any) => {
    try {
      await productionService.create(data);
      toast.success("Producción registrada");
    } catch {
      toast.error("Error");
    }
  };
  return (
    <Layout>
      <div className="p-4 max-w-xl">
        <h2 className="mb-4">Registrar Producción</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label>Tipo</label>
            <select {...register("tipo")} className="w-full border p-2 rounded">
              <option value="huevos">Huevos</option>
              <option value="miel">Miel</option>
              <option value="peso">Ganancia peso</option>
            </select>
          </div>
          <div>
            <label>Fecha</label>
            <input type="date" {...register("fecha")} className="w-full border p-2 rounded" />
          </div>
          <div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Registrar</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}