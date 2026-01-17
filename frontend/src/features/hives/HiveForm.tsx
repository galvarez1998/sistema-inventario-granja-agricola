import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { hiveService, Hive } from "../../api/hiveService";

const hiveSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  ultimaProduccionLitros: z.number().min(0, "Debe ser mayor a 0"),
  ubicacion: z.string().optional(),
});

type HiveFormData = z.infer<typeof hiveSchema>;

export default function HiveForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEdit = !!id;

  const { data: hive } = useQuery<Hive>(
    ["hive", id],
    () => hiveService.get(id!),
    { enabled: isEdit }
  );

  const { register, handleSubmit, reset, formState: { errors } } = useForm<HiveFormData>({
    resolver: zodResolver(hiveSchema),
  });

  useEffect(() => {
    if (hive) {
      const formData: HiveFormData = {
        nombre: hive.nombre,
        ultimaProduccionLitros: hive.ultimaProduccionLitros,
        ubicacion: hive.ubicacion ?? undefined,
      };
      reset(formData);
    }
  }, [hive, reset]);

  const onSubmit = async (data: HiveFormData) => {
    try {
      if (isEdit) {
        await hiveService.update(id!, data);
        toast.success("Colmena actualizada");
      } else {
        await hiveService.create(data);
        toast.success("Colmena creada");
      await queryClient.invalidateQueries({ queryKey: ["hives"] });
      }
      navigate("/hives");
    } catch {
      toast.error("Error al guardar");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">{isEdit ? "Editar Colmena" : "Nueva Colmena"}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Nombre</label>
          <input {...register("nombre")} className="w-full border px-2 py-1" />
          {errors.nombre && <span className="text-red-600">{errors.nombre.message}</span>}
        </div>
        <div>
          <label>Última Producción (L)</label>
          <input {...register("ultimaProduccionLitros", { valueAsNumber: true })} type="number" step="0.1" className="w-full border px-2 py-1" />
          {errors.ultimaProduccionLitros && <span className="text-red-600">{errors.ultimaProduccionLitros.message}</span>}
        </div>
        <div>
          <label>Ubicación</label>
          <input {...register("ubicacion")} className="w-full border px-2 py-1" />
        </div>
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded flex-1">Guardar</button>
          <button type="button" onClick={() => navigate("/hives")} className="bg-gray-400 text-white px-4 py-2 rounded flex-1">Cancelar</button>
        </div>
      </form>
    </div>
  );
}
