import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { productionService, Production } from "../../api/productionService";

const productionSchema = z.object({
  tipo: z.enum(["huevos", "miel", "peso"]),
  fecha: z.string(),
  cantidadHuevos: z.number().optional(),
  cantidadMiel: z.number().optional(),
  gananciaPeso: z.number().optional(),
  referencia: z.string().optional(),
});

type ProductionFormData = z.infer<typeof productionSchema>;

export default function ProductionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEdit = !!id;

  const { data: production } = useQuery<Production>(
    ["production", id],
    () => productionService.get(id!),
    { enabled: isEdit }
  );

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<ProductionFormData>({
    resolver: zodResolver(productionSchema),
    defaultValues: {
      tipo: "huevos",
      fecha: new Date().toISOString().split('T')[0]
    }
  });

  const tipo = watch("tipo");

  useEffect(() => {
    if (production) {
      const formData: ProductionFormData = {
        tipo: production.tipo,
        fecha: typeof production.fecha === 'string' ? production.fecha : new Date(production.fecha).toISOString().split('T')[0],
        cantidadHuevos: production.cantidadHuevos ?? undefined,
        cantidadMiel: production.cantidadMiel ?? undefined,
        gananciaPeso: production.gananciaPeso ?? undefined,
        referencia: production.referencia ?? undefined,
      };
      reset(formData);
    }
  }, [production, reset]);

  const onSubmit = async (data: ProductionFormData) => {
    try {
      if (isEdit) {
        await productionService.update(id!, data);
        toast.success("Producción actualizada");
      } else {
        await productionService.create(data);
        toast.success("Producción registrada");
      await queryClient.invalidateQueries({ queryKey: ["production"] });
      }
      navigate("/production");
    } catch {
      toast.error("Error al guardar");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">{isEdit ? "Editar Producción" : "Nueva Producción"}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Tipo</label>
          <select {...register("tipo")} className="w-full border px-2 py-1">
            <option value="huevos">Huevos</option>
            <option value="miel">Miel</option>
            <option value="peso">Ganancia peso</option>
          </select>
          {errors.tipo && <span className="text-red-600">{errors.tipo.message}</span>}
        </div>
        <div>
          <label>Fecha</label>
          <input {...register("fecha")} type="date" className="w-full border px-2 py-1" />
          {errors.fecha && <span className="text-red-600">{errors.fecha.message}</span>}
        </div>

        {tipo === "huevos" && (
          <div>
            <label>Cantidad de Huevos</label>
            <input {...register("cantidadHuevos", { valueAsNumber: true })} type="number" min="0" className="w-full border px-2 py-1" />
          </div>
        )}

        {tipo === "miel" && (
          <div>
            <label>Cantidad de Miel (L)</label>
            <input {...register("cantidadMiel", { valueAsNumber: true })} type="number" step="0.1" min="0" className="w-full border px-2 py-1" />
          </div>
        )}

        {tipo === "peso" && (
          <div>
            <label>Ganancia de Peso (kg)</label>
            <input {...register("gananciaPeso", { valueAsNumber: true })} type="number" step="0.1" min="0" className="w-full border px-2 py-1" />
          </div>
        )}

        <div>
          <label>Referencia</label>
          <input {...register("referencia")} className="w-full border px-2 py-1" placeholder="ID del animal o colmena" />
        </div>

        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded flex-1">Guardar</button>
          <button type="button" onClick={() => navigate("/production")} className="bg-gray-400 text-white px-4 py-2 rounded flex-1">Cancelar</button>
        </div>
      </form>
    </div>
  );
}