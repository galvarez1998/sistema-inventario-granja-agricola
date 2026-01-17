import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/api";
import toast from "react-hot-toast";

const schema = z.object({
  especie: z.string().min(1),
  fechaIngreso: z.string().optional(),
  edad: z.string().optional(),
  peso: z.number().optional().nullable(),
  estado: z.enum(["saludable", "enfermo", "vendido", "muerto"]).optional(),
  cantidad: z.number().int().nonnegative().optional(),
  observaciones: z.string().optional()
});
type FormData = z.infer<typeof schema>;

export default function AnimalForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (id) {
      API.get(`/animals/${id}`).then((r) => reset(r.data)).catch(() => toast.error("No se pudo cargar"));
    } else {
      reset({ cantidad: 1, estado: "saludable" });
    }
  }, [id]);

  const onSubmit = async (data: FormData) => {
    try {
      if (id) {
        await API.put(`/animals/${id}`, data);
        toast.success("Actualizado");
      } else {
        await API.post("/animals", data);
        toast.success("Creado");
      }
      navigate("/animals");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Error");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl mb-4">{id ? "Editar Animal" : "Nuevo Animal"}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block">Especie</label>
          <input {...register("especie")} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block">Cantidad</label>
          <input type="number" {...register("cantidad", { valueAsNumber: true })} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block">Peso (kg)</label>
          <input type="number" step="0.01" {...register("peso", { valueAsNumber: true })} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block">Observaciones</label>
          <textarea {...register("observaciones")} className="w-full border p-2 rounded" />
        </div>

        <div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {id ? "Guardar" : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
}